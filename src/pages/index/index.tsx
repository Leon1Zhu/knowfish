import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Button, Text, Icon, CoverImage } from "@tarojs/components";

import "./index.less";
import { host } from "src/interceptor";
import { getMonthAndDay } from "../utils";

type PageStateProps = {
  counter: {
    num: number;
  };
};

type PageOwnProps = {};

class PageState {
  ismask: "none" | "block" = "none";
}

type IProps = PageStateProps & PageOwnProps;

interface Index {
  props: IProps;
}

class Index extends Component<IProps, PageState> {
  config: Config = {
    navigationBarTitleText: "首页"
  };

  state = new PageState();

  componentDidShow() {
    if (
      typeof this.$scope.getTabBar === "function" &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 0
      });
    }
  }

  componentDidMount() {
    Taro.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          Taro.getUserInfo({
            success: res => {
              // 根据用户信息获取每日一猜
            }
          });
        } else {
          this.setState({
            ismask: "block"
          });
        }
      }
    });
  }

  getUserInfo = () => {};

  getDailyGuess() {}

  renderDayGuessContent() {
    // TODO icon更新
    return (
      <View className="day-guess-content">
        <View className="guess-day-info">{getMonthAndDay()}</View>
        <View className="iconfont iconArtboardCopy"></View>
        <CoverImage
          className="day-guess-img"
          src={`${host}/images/fig/fish/ff0300a.jpg`}
        ></CoverImage>
        <View className="day-guess-text">每日一猜·这是什么鱼?</View>
        <ul className="day-guess-answer-list">
          <li className="day-guess-answer-item">金鱼</li>
          <li className="day-guess-answer-item">金鱼</li>
          <li className="day-guess-answer-item">小丑鱼</li>
        </ul>
      </View>
    );
  }

  toScan(res) {
    Taro.navigateTo({
      url: "/pages/camera/camera"
    });
  }

  renderCameraContent() {
    return (
      <View className="camera-wrapper">
        <View className="camera-content" onClick={this.toScan}>
          <View className="iconfont iconcamera"></View>
          <View className="photo-text">拍照</View>
        </View>

        <View className="select-from-photo">从相册选择</View>
      </View>
    );
  }

  render() {
    return (
      <View className="index">
        <Button
          className="search-button"
          type="default"
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/search/index"
            });
          }}
          hover-class="other-button-hover"
        >
          <Icon size="15" type="search" />
          搜索
        </Button>

        {this.renderDayGuessContent()}

        {this.renderCameraContent()}

        <View className="show-author" style={`display:${this.state.ismask}`}>
          <View className="show-author-title">
            <Button open-type="getUserInfo" onGetUserInfo={this.getUserInfo}>
              授权登录
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
export default Index as ComponentClass<PageOwnProps, PageState>;
