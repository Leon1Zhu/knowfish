/**
 * @author 朱亮
 * @description 图片分享页
 */
import Taro, { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";
import { host } from "../../interceptor";
import { setPictureBycreateCanvasContext } from "./getSharePicture";
const QQMap = require("../../lib/qqmap-wx-jssdk.min.js");

import "./index.less";

class SharePicturePage extends Component {
  config: Config = {
    navigationBarTitleText: "分享"
  };

  qqmapsdk;

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
    Taro.showLoading({
      title: "加载中"
    });
    this.qqmapsdk = new QQMap({
      key: "JNHBZ-L2W23-N4D3S-Y57L4-E6O4Q-L5FWJ"
    });

    this.drawCanvasImg();
  }

  drawCanvasImg() {
    Promise.all([
      Taro.getImageInfo({
        src: `${host}/images/fig/fish/ff0300a.jpg`
      }),
      Taro.getImageInfo({
        src: `${host}/images/fig/fish/ff0300a.jpg`
      }),
      Taro.getUserInfo()
    ])
      .then(res => {
        setPictureBycreateCanvasContext(res, {}, this.qqmapsdk);
      })
      .catch(err => {
        Taro.hideLoading();
        Taro.showToast({
          title: "获取图片资源失败",
          icon: "none",
          duration: 2000
        });
      });
  }

  onShareAppMessage(res) {
    return {
      title: "自定义转发标题",
      path: `/page/shareDetail?id=${this.$router.params.id}`
    };
  }

  saveToSystem = () => {
    Taro.canvasToTempFilePath(
      {
        canvasId: "share-canvas"
      },
      this
    )
      .then(res => {
        return Taro.saveImageToPhotosAlbum({
          filePath: res.tempFilePath
        });
      })
      .then(res => {
        Taro.showToast({
          title: "已保存到相册"
        });
      });
  };

  render() {
    return (
      <View className="share-page">
        <canvas
          id="share-canvas"
          canvas-id="share-canvas"
          style="width:325px;height:560px"
        ></canvas>

        <View className="share-btns">
          <Button openType="share">分享给好友</Button>
          <Button onClick={this.saveToSystem}>保存图片</Button>
        </View>
      </View>
    );
  }
}

export default SharePicturePage as ComponentClass<any, any>;
