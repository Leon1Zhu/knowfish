import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Icon, Input, Button, Image } from "@tarojs/components";

import "./index.less";
import { host, imgHost } from "src/interceptor";
import { errorHandle, timeago, previewImage } from "../utils";
import EmptyContent from "../commons/emptyContent";
import { connect } from "@tarojs/redux";

class Props {
  userReducer: any;
}

class State {
  articles = [] as any[];

  height = 0;

  article = {} as any;

  focusInput = false;

  value = "";

  userInfo: any;

  tempValue;
}

@connect(({ userReducer }) => ({
  userReducer
}))
class Communication extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: "交流"
  };

  state = new State();

  componentDidShow() {
    if (
      typeof this.$scope.getTabBar === "function" &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 2
      });
    }

    this.getArticles();
  }

  componentDidMount() {
    Taro.getUserInfo().then(userInfo => {
      this.setState({
        userInfo: userInfo.userInfo
      });
    });
    wx.onKeyboardHeightChange(res => {
      if (res.height === 0 && this.state.height > 0) {
        // this.setState({
        //   height: 0
        // });
      } else if (res.height > 0 && res.height !== this.state.height) {
        this.setState({
          // height: res.height,
          value: ""
        });
      }
    });
  }

  toAddPage = () => {
    Taro.navigateTo({
      url: "/pages/addCommunicate/addCommunicate"
    });
  };

  deleteCommunication = article => {
    Taro.showModal({
      title: "提示",
      content: "确认删除该动态吗？",
      success: res => {
        Taro.showLoading({
          title: "删除中"
        });

        if (res.confirm) {
          // 删除该article
          Taro.request({
            url: host + `/api/deleteArticle.do?articleId=${article.articleId}`,
            method: "POST"
          })
            .then(res => {
              Taro.hideLoading();
              Taro.showToast({
                title: "删除成功",
                duration: 1500
              });
              this.getArticles();
            })
            .catch(err => {
              Taro.hideLoading();
            });
        }
      }
    });
  };

  getArticles = () => {
    const isMyArticle = this.$router.params.isMyArticle;

    Taro.showLoading({
      title: "数据加载中"
    });

    Taro.request({
      url: host + "/api/getAllArticles.do"
    })
      .then(res => {
        let articles = res.data.data;

        if (isMyArticle) {
          articles =
            articles &&
            articles.filter(
              article =>
                article.user.userId === this.props.userReducer.loginInfo.openId
            );
        }

        this.setState({
          articles
        });

        Taro.hideLoading();
      })
      .catch(err => {
        errorHandle();
      });
  };

  inputFocus(article) {
    if (this.state.height > 0) {
      this.setState({
        height: 0,
        value: ""
      });
    }
    this.setState({
      article
    });
  }

  renderCommunicateItem(article: any) {
    const { userReducer } = this.props;
    const { tempValue } = this.state;

    const isModifyUser = article.user.userId === userReducer.loginInfo.openId;
    return (
      <View className="article-item">
        {isModifyUser && (
          <View
            className="delete-text"
            onClick={this.deleteCommunication.bind(this, article)}
          >
            删除
          </View>
        )}
        <View className="userinfo-content">
          <Image className="user-image" src={article.user.userIconUrl} />
          <View className="right-content">
            <View className="user-name">{article.user.userName}</View>
            <View className="time-info">{timeago(article.createTime)}</View>
          </View>
        </View>

        <View className="article-content">{article.articleContent}</View>

        <Image
          className="fish-img"
          src={imgHost + article.articleImgs}
          onClick={() => {
            previewImage([article.articleImgs]);
          }}
        />

        <View className="commoent-conetnt">
          {article.comments.map(comment => {
            return (
              <View className="comment-item">
                <View className="user-info">{comment.user.userName}:</View>
                <View className="content">{comment.content}</View>
              </View>
            );
          })}
        </View>

        <Input
          onClick={this.inputFocus.bind(this, article)}
          className="comment-input"
          placeholder="写评论"
          placeholderClass="plac-input"
          confirmType="send"
          onConfirm={e => {
            this.setState({
              tempValue: ""
            });
            this.handleAddComment(e.detail.value);
          }}
          value={tempValue}
        />
      </View>
    );
  }

  handleAddComment = value => {
    const { article, userInfo } = this.state;

    Taro.showLoading({
      title: "数据加载中"
    });

    this.setState({
      height: 0,
      article: {}
    });

    Taro.hideKeyboard();

    Taro.request({
      url: host + "/api/addComment.do",
      method: "POST",
      data: {
        article: {
          articleId: article.articleId
        },
        user: {
          userId: this.props.userReducer.loginInfo.openId,
          userName: userInfo.nickName
        },
        content: value
      }
    })
      .then(res => {
        this.getArticles();
      })
      .catch(err => {
        errorHandle();
      });
  };

  render() {
    const { articles, height } = this.state;
    return (
      <View className="communication-page">
        <Icon
          className="clear-icon"
          type="clear"
          size="50"
          color="#05e7cb"
          onClick={this.toAddPage}
        />
        {articles && articles.length > 0 ? (
          articles.map(article => this.renderCommunicateItem(article))
        ) : (
          <EmptyContent content="暂无数据"></EmptyContent>
        )}

        <View className={`commentInputView ${height > 0 && "show"}`}>
          <View className="commentInput">
            <Input
              className="input"
              value={this.state.value}
              onInput={e => {
                this.setState({
                  value: e.detail.value
                });

                return e.detail.value;
              }}
              focus={this.state.height > 0}
              placeholder="写评论"
            />
          </View>
          <Button
            disabled={!this.state.value}
            className="send"
            onClick={this.handleAddComment}
          >
            发送
          </Button>
        </View>
      </View>
    );
  }
}

export default Communication as ComponentClass<Props, State>;
