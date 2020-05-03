import Taro, { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, ScrollView, CoverImage, Text } from "@tarojs/components";
import PageNativeComponent from "../commons/pageNativeComponent";
import { connect } from "@tarojs/redux";
import { host } from "src/interceptor";
import { previewImage, tsFormatTime } from "../utils";
import EmptyContent from "../commons/emptyContent";
import "./index.less";

class State {
  userInfo = {} as Taro.UserInfo;

  recordInfo: any[] = [];
}

@connect(({ userReducer }) => ({
  userReducer
}))
class HomePage extends Component<any, State> {
  config: Config = {
    navigationBarTitleText: "我的"
  };

  timmer;

  componentDidShow() {
    if (
      typeof this.$scope.getTabBar === "function" &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 2
      });
    }

    if (this.props.userReducer.loginInfo.openId) {
      this.getRecordData(this.props.userReducer.loginInfo.openId);
    }
  }

  componentDidMount() {
    Taro.getUserInfo().then(userInfo => {
      this.setState({
        userInfo: userInfo.userInfo
      });
    });

    this.timmer = setInterval(() => {
      if (this.props.userReducer.loginInfo.openId) {
        this.getRecordData(this.props.userReducer.loginInfo.openId);

        clearInterval(this.timmer);
      }
    }, 500);
  }

  toMyCommunicationPage = () => {
    wx.switchTab({ url: "/pages/communication/index?isMyArticle=true" });
  };

  getRecordData = (openId: string) => {
    Taro.showLoading({
      title: "数据加载中"
    });

    Taro.request({
      url: host + "/api/getIdentifiedRecords.do",
      data: {
        userId: openId
      }
    })
      .then(res => {
        Taro.hideLoading();
        this.setState({
          recordInfo: res.data.data
        });
      })
      .catch(err => {
        Taro.hideLoading();
        Taro.showModal({
          title: "小提示",
          content: "网络错误",
          showCancel: false
        });
      });
  };

  renderMyRevcord() {
    const { recordInfo } = this.state;

    return (
      <View className="my-record">
        <View className="title">
          <View className="record-text">我的识鱼记录</View>
          <View
            className="allRecord"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/recordHistory/recordHistory"
              });
            }}
          >
            全部
          </View>
        </View>
        <ScrollView className="scrollview" scrollX style="width: 100%">
          {recordInfo && recordInfo.length > 0 ? (
            recordInfo.map(record => {
              return (
                <View key={record.id} className="record-content">
                  <CoverImage
                    className="cover-iamge"
                    src={`${host}${record.smallImageLink.replace(
                      "/fishing",
                      ""
                    )}`}
                    onClick={() => {
                      previewImage([
                        record.uploadedImageLink.replace("/fishing", "")
                      ]);
                    }}
                  ></CoverImage>
                  <View className="revord-date">
                    {tsFormatTime(record.createTime, "Y-M-D")}
                  </View>
                </View>
              );
            })
          ) : (
            <EmptyContent content="暂无数据"></EmptyContent>
          )}
        </ScrollView>
      </View>
    );
  }

  render() {
    const { userInfo } = this.state;
    return (
      <View className="home-page">
        <View className="user-info">
          <CoverImage
            className="user-header-image"
            src={userInfo.avatarUrl}
          ></CoverImage>
          {userInfo.nickName}
        </View>
        <PageNativeComponent
          className="my-discussion"
          title="我的交流"
          onClick={this.toMyCommunicationPage}
        ></PageNativeComponent>
        {this.renderMyRevcord()}
        <PageNativeComponent
          className="ziliao-origin"
          title="资料来源"
        ></PageNativeComponent>
        <PageNativeComponent className="about-us" title="关于我们">
          <View className="describe">
            我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述我是一段描述
          </View>
          <View className="email">
            联系邮箱: <Text>Knowfish@163.com</Text>
          </View>
        </PageNativeComponent>
      </View>
    );
  }
}

export default HomePage as ComponentClass<any, State>;
