import Taro, { Component, ComponentClass, Config, getApp } from "@tarojs/taro";
import { View, ScrollView, CoverImage, Text, Image } from "@tarojs/components";
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
        selected: 3
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
    wx.setStorageSync("isMyArticle", true);
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

  goNavgateToMiniProgram = (appid, path?) => {
    wx.navigateToMiniProgram({
      appId: appid,
      path: path || "page/index/index",
      success(res) {
        // 打开成功
        console.log(res);
      }
    });
  };

  renderMyRevcord() {
    const { recordInfo } = this.state;

    return (
      <View className="my-record">
        <View className="title">
          <View className="record-text">识别记录</View>
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
                  <Image
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
                  ></Image>
                  <View className="revord-date">
                    {tsFormatTime(record.createTime, "Y-M-D")}
                  </View>
                </View>
              );
            })
          ) : (
            <EmptyContent content="暂无数据" />
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
          <image class="user-header-image" src={userInfo.avatarUrl}></image>
          {userInfo.nickName}
        </View>
        <PageNativeComponent
          className="my-discussion"
          title="我的交流"
          showArrow
          onClick={this.toMyCommunicationPage}
        ></PageNativeComponent>
        {/* {this.renderMyRevcord()} */}
        <PageNativeComponent
          className="ziliao-origin"
          title="识别记录"
          showArrow
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/recordHistory/recordHistory"
            });
          }}
        ></PageNativeComponent>
        <PageNativeComponent
          className="ziliao-origin"
          title="资料来源"
          showArrow
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/sourceOrigin/sourceOrigin"
            });
          }}
        ></PageNativeComponent>
        <PageNativeComponent
          className="know-link"
          title="识鱼"
          showArrow
          onClick={() => {
            this.goNavgateToMiniProgram(
              "wxa49f41d543e9df9d",
              "/pages/identify/identify"
            );
          }}
        ></PageNativeComponent>
        <PageNativeComponent
          className="know-link"
          title="识贝"
          showArrow
          onClick={() => {
            this.goNavgateToMiniProgram(
              "wxadbfb8342619b0fd",
              "/pages/identify/identify"
            );
          }}
        ></PageNativeComponent>
        <PageNativeComponent
          className="know-link"
          title="识虾蟹"
          showArrow
          onClick={() => {
            this.goNavgateToMiniProgram(
              "wx81c8f0022c621480",
              "/pages/identify/identify"
            );
          }}
        ></PageNativeComponent>
        <PageNativeComponent
          showArrow
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/about/index"
            });
          }}
          className="about-us"
          title="关于我们"
        ></PageNativeComponent>
      </View>
    );
  }
}

export default HomePage as ComponentClass<any, State>;
