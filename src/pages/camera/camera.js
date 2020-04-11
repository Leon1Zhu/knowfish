/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable jsx-quotes */
/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/camelcase */
import {
  Block,
  View,
  Image,
  Camera,
  CoverView,
  CoverImage
} from "@tarojs/components";
import { host } from "src/interceptor";

import Taro from "@tarojs/taro";
import withWeapp from "@tarojs/with-weapp";
import "./camera.less";

@withWeapp({
  data: {
    goto_history_animation: "",
    goto_snap_animation: "",
    goto_search_animation: "",
    animation: "",
    snap_button_animation: "",
    album_button_animation: "",
    history_button_animation: "",
    search_button_animation: "",
    condition: ""
  },

  onLoad: function(options) {
    //const device = wx.getSystemInfoSync()
    Taro.setNavigationBarTitle({
      title: "拍照识别"
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      condition: ""
    });
  },

  goto_search: function(event) {
    var that = this;
    var zero = 0;
    Taro.navigateTo({
      url: "../search/search?write=" + zero
    });
  },

  goto_history: function(event) {
    var that = this;
    Taro.navigateTo({
      url: "../history/history"
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: "分享",
      path: "pages/camera/camera"
    };
  },

  takePhoto() {
    var that = this;
    const ctx = Taro.createCameraContext();
    ctx.takePhoto({
      quality: "normal", // normal, high

      success: res => {
        var that1 = that;
        that1.setData({
          src: res.tempImagePath
        });
        var tempFilePaths = res.tempImagePath;
        Taro.showLoading({
          title: "识别中"
        }),
          Taro.uploadFile({
            url: host + "/identify.do",
            filePath: res.tempImagePath,
            name: "file",
            formData: {
              type: "fish"
            },
            success: function(res) {
              try {
                var code = JSON.parse(res.data).code;
              } catch (e) {
                Taro.showModal({
                  title: "小提示",
                  content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                  showCancel: "false",
                  success: function(res) {}
                });
              }
              if (code == 1) {
                Taro.showModal({
                  title: "小提示",
                  content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                  showCancel: "false",
                  success: function(res) {}
                });
              }
              if (code == 0) {
                var outcome = JSON.parse(res.data).data;
                var ids = [];
                var rates = [];
                for (var i = 0; i < outcome.length; i++) {
                  if (outcome[i].id >= 0 && outcome[i].id <= 9999999) {
                    ids.push(outcome[i].id);
                    rates.push(outcome[i].recognitionRate);
                  }
                }
                if (ids.length == 0) {
                  Taro.showModal({
                    title: "小提示",
                    content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                    showCancel: "false",
                    success: function(res) {}
                  });
                }
              }
            },
            fail: function(res1) {
              console.log("failed to result");
              Taro.showModal({
                title: "小提示",
                content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                showCancel: "false",
                success: function(res) {}
              });
            },
            complete: function(res1) {
              Taro.hideLoading();
            }
          });
      }
    });
  },

  chooseimage: function() {
    var that = this;
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"], // 指定是原图或压缩图，默认二者都有 original,compressed
      sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        var that1 = that;

        console.log("choose:" + res.tempFilePaths[0]);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        Taro.showLoading({
          title: "识别中"
        }),
          Taro.uploadFile({
            url: host + "/identify.do",
            filePath: tempFilePaths[0],
            name: "file",
            formData: {
              type: "fish"
            },
            success: function(res) {
              //console.log(res);
              try {
                var code = JSON.parse(res.data).code;
              } catch (e) {
                Taro.showModal({
                  title: "小提示",
                  content: "网络错误",
                  showCancel: "false",
                  success: function(res) {}
                });
              }
              if (code == 1) {
                Taro.showModal({
                  title: "小提示",
                  content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                  showCancel: "false",
                  success: function(res) {}
                });
              }
              if (code == 0) {
                var outcome = JSON.parse(res.data).data;
                var ids = [];
                var rates = [];
                for (var i = 0; i < outcome.length; i++) {
                  if (outcome[i].id >= 0 && outcome[i].id <= 9999999) {
                    ids.push(outcome[i].id);
                    rates.push(outcome[i].recognitionRate);
                  }
                }
                if (ids.length == 0) {
                  Taro.showModal({
                    title: "小提示",
                    content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                    showCancel: "false"
                  });
                }
              }
            },
            fail: function(res) {
              console.log("failed to result");
              Taro.showToast({
                title: "网络错误",
                icon: "loading",
                duration: 1500
              });
            },
            complete: function(res) {
              Taro.hideLoading();
              that.setData({
                snap_state: "takePhoto",
                album_state: "chooseimage",
                history_state: "goto_history"
              });
            }
          });
      }
    });
  }
})
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: "识鱼",
    disableScroll: true
  };

  render() {
    const {
      src,
      condition,
      snap_state,
      history_state,
      album_state
    } = this.data;
    return (
      <Block>
        <View>
          {condition ? (
            <View>
              <Image
                mode="aspectFit"
                style="width: 100vw; height: 100vh;"
                src={src}
              ></Image>
            </View>
          ) : (
            <View>
              <Camera
                className="photo"
                devicePosition="back"
                flash="off"
                onError={this.error}
                style="width: 100vw; height: 100vh;"
              >
                <CoverView className="white_box">
                  <CoverImage src={require("image/box1.png")}></CoverImage>
                </CoverView>
                <CoverView className="button_cover_view">
                  <CoverView className="top_button_cover_view">
                    <CoverView
                      className="snap_button_cover_view"
                      onClick={this.takePhoto}
                    >
                      <CoverImage src={require("image/tap.png")}></CoverImage>
                    </CoverView>
                  </CoverView>
                  <CoverView className="bottom_button_cover_view">
                    <CoverView className="history_cover_view">
                      <CoverView
                        className="history_button_cover_view"
                        onClick={this.goto_history}
                      >
                        <CoverImage
                          src={require("image/history.png")}
                        ></CoverImage>
                      </CoverView>
                    </CoverView>
                    <CoverView className="album_cover_view">
                      <CoverView
                        className="album_button_cover_view"
                        onClick={this.chooseimage}
                      >
                        <CoverImage
                          src={require("image/album.png")}
                        ></CoverImage>
                      </CoverView>
                    </CoverView>
                  </CoverView>
                </CoverView>
              </Camera>
            </View>
          )}
        </View>
      </Block>
    );
  }
}

export default _C;
