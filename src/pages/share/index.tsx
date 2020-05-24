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
import API from "src/services/mods";

class State {
  fishData: any = {};
}

class SharePicturePage extends Component<any, State> {
  config: Config = {
    navigationBarTitleText: "分享"
  };

  qqmapsdk;

  componentDidMount() {
    Taro.showLoading({
      title: "加载中"
    });
    this.qqmapsdk = new QQMap({
      key: "JNHBZ-L2W23-N4D3S-Y57L4-E6O4Q-L5FWJ"
    });

    const latinName = this.$router.params.latinName;
    API.andriod.getInfoByLatinName
      .request({
        latinName
      })
      .then(res => {
        this.setState({
          fishData: res.data
        });
        this.drawCanvasImg(res.data);
      });
  }

  drawCanvasImg(data: any) {
    Promise.all([
      Taro.getImageInfo({
        src: `${host}${data.smallImage}`
      }),
      Taro.getImageInfo({
        src: `${host}/smallImage/weixin_qr.jpg`
      }),
      Taro.getUserInfo()
    ])
      .then(res => {
        console.log(res);
        setPictureBycreateCanvasContext(res, data, this.qqmapsdk);
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
    const { fishData } = this.state;
    return {
      title: fishData.name,
      path: `/pages/share/shareDetail?latinName=${this.$router.params.latinName}`
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
          style="width:325px;height:660px"
        ></canvas>

        <View className="share-btns">
          <Button openType="share" className="share-btn">
            分享给好友
          </Button>
          <Button className="save-img" onClick={this.saveToSystem}>
            保存美图
          </Button>
        </View>
      </View>
    );
  }
}

export default SharePicturePage as ComponentClass<any, any>;
