import "./index.less";
import Taro, { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, ScrollView, CoverImage, Text } from "@tarojs/components";
import PageNativeComponent from "../commons/pageNativeComponent";
import { connect } from "@tarojs/redux";
import { host } from "src/interceptor";
import { previewImage } from "../utils";

const mockRecord = [
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  }
];

class State {
  userInfo = {} as Taro.UserInfo;
}

@connect(({ userReducer }) => ({
  userReducer
}))
class HomePage extends Component<any, State> {
  config: Config = {
    navigationBarTitleText: "我的"
  };

  componentDidShow() {
    if (
      typeof this.$scope.getTabBar === "function" &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 1
      });
    }
  }

  componentDidMount() {
    Taro.getUserInfo().then(res => {
      console.log(res);
      this.setState({
        userInfo: res.userInfo
      });
    });
  }

  renderMyRevcord() {
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
          {mockRecord.map(record => {
            return (
              <View className="record-content">
                <CoverImage
                  className="cover-iamge"
                  src={`${host}${record.smallImage}`}
                  onClick={() => {
                    previewImage([record.fig1]);
                  }}
                ></CoverImage>
                <View className="revord-date">{record.date}</View>
              </View>
            );
          })}
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
