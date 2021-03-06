/* eslint-disable taro/this-props-function */
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
import { connect } from "@tarojs/redux";
import { host } from "src/interceptor";

import Taro from "@tarojs/taro";
import withWeapp from "@tarojs/with-weapp";
import { setSearchResult } from "../../actions/searchActions";
import "./camera.less";

@connect(
  ({ searchResultReducer, userReducer }) => ({
    searchResultReducer,
    userReducer
  }),
  dispatch => ({
    setResult(data) {
      dispatch(setSearchResult(data));
    }
  })
)
class _C extends Taro.Component {
  config = {
    navigationBarTitleText: "识鱼",
    disableScroll: true
  };

  goto_history = event => {
    var that = this;
    Taro.navigateTo({
      url: "../history/history"
    });
  };

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage = () => {
    return {
      title: "分享",
      path: "pages/camera/camera"
    };
  };

  takePhoto = () => {
    var that = this;
    const ctx = Taro.createCameraContext();
    ctx.takePhoto({
      quality: "normal", // normal, high

      success: res => {
        var that1 = that;
        var tempFilePaths = res.tempImagePath;
        Taro.showLoading({
          title: "识别中"
        });

        Taro.uploadFile({
          url: host + "/api/identify.do",
          filePath: res.tempImagePath,
          formData: {
            userId:
              this.props.userReducer && this.props.userReducer.loginInfo.openId
          },
          name: "file",
          success: res => {
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
              for (var i = 0; i < outcome.length; i++) {
                if (outcome[i].id >= 0 && outcome[i].id <= 9999999) {
                  ids.push(outcome[i].id);
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

              this.props.setResult(outcome);
              Taro.navigateTo({
                url: `/pages/detail/index?latinName=${outcome[0] &&
                  outcome[0].latinName}&recognitionRate= ${outcome[0] &&
                  outcome[0].recognitionRate}`
              });
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
  };

  chooseimage = () => {
    var that = this;
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"], // 指定是原图或压缩图，默认二者都有 original,compressed
      sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        var that1 = that;

        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        Taro.showLoading({
          title: "识别中"
        });
        Taro.uploadFile({
          url: host + "/api/identify.do",
          filePath: tempFilePaths[0],
          formData: {
            userId:
              this.props.userReducer && this.props.userReducer.loginInfo.openId
          },
          name: "file",
          success: res => {
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

              this.props.setResult(outcome);
              Taro.navigateTo({
                url: `/pages/detail/index?latinName=${outcome[0] &&
                  outcome[0].latinName}&recognitionRate= ${outcome[0] &&
                  outcome[0].recognitionRate}`
              });
            }
          },
          fail: function(res) {
            Taro.showToast({
              title: "网络错误",
              icon: "loading",
              duration: 1500
            });
          },
          complete: function(res) {
            Taro.hideLoading();
          }
        });
      }
    });
  };

  render() {
    return (
      <Block>
        <View>
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
                  <CoverView className="album_cover_view">
                    <CoverView
                      className="album_button_cover_view"
                      onClick={this.chooseimage}
                    >
                      <CoverImage
                        src={require("../../image/album.png")}
                      ></CoverImage>
                    </CoverView>
                  </CoverView>
                </CoverView>
              </CoverView>
            </Camera>
          </View>
        </View>
      </Block>
    );
  }
}

export default _C;
