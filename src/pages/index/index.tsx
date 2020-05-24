import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { connect } from "@tarojs/redux";
import { View, Button, Text, Icon, CoverImage } from "@tarojs/components";
import { setSearchResult } from "../../actions/searchActions";

import "./index.less";
import { host } from "src/interceptor";
import { getMonthAndDay, errorHandle } from "../utils";

class PageState {
  dailyGuessData = {} as any;

  randomInfo: any = {};
}

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
class Index extends Component<any, PageState> {
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

  getRandomData = () => {
    Taro.showLoading({
      title: "数据加载中"
    });

    Taro.request({
      url: host + "/api/getRandomInfo.do"
    })
      .then(res => {
        console.log(res);
        Taro.hideLoading();
        this.setState({
          randomInfo: res.data.data
        });
      })
      .catch(error => {
        errorHandle();
      });
  };

  componentDidMount() {
    this.getRandomData();
  }

  goToShare = () => {
    const { randomInfo } = this.state;

    // TODO 拉丁名动态替换
    Taro.navigateTo({
      url: `/pages/share/index?latinName=${randomInfo.latinName}`
    });
  };

  renderDayGuessContent() {
    const { randomInfo } = this.state;

    return (
      <View className="day-guess-content">
        <View className="guess-day-info">{getMonthAndDay()}</View>
        <View
          className="iconfont iconArtboardCopy"
          onClick={this.goToShare}
        ></View>
        <image class="day-guess-img" src={`${host}${randomInfo.smallImage}`} />
        <View className="day-guess-text">每日新知·{randomInfo.name}</View>
        <View className="day-guess-answer-list">
          {randomInfo.livingHabit
            ? `${randomInfo.livingHabit}色法师法师打发斯蒂芬撒地方了喀什东路咖啡机阿斯利康大姐夫拉设计费卢卡斯加法拉盛的进来；开发加上了；会计法爱丽丝的减肥啦电视剧分类；开始的减肥了； 爱上建档立卡；房价爱上了；点击法拉盛；大姐夫拉时代峻峰拉时代峻峰了； 傲娇受得了；放适量；大姐夫拉设计费啦经理肯定撒娇福利卡三等奖`
            : "暂无"}
        </View>
      </View>
    );
  }

  chooseimage = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"], // 指定是原图或压缩图，默认二者都有 original,compressed
      sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
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
                showCancel: false
              });
            }
            if (code == 1) {
              Taro.showModal({
                title: "小提示",
                content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                showCancel: false
              });
            }
            if (code == 0) {
              var outcome = JSON.parse(res.data).data;
              var ids = [];
              for (var i = 0; i < outcome.length; i++) {
                if (outcome[i].id >= 0 && outcome[i].id <= 9999999) {
                  ids.push(outcome[i].id as never);
                }
              }
              if (ids.length == 0) {
                Taro.showModal({
                  title: "小提示",
                  content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
                  showCancel: false
                });
              }

              this.props.setResult(outcome);
              Taro.navigateTo({
                url: `/pages/detail/index?latinName=${outcome[0] &&
                  outcome[0].latinName}`
              });
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
          }
        });
      }
    });
  };

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

        <View className="select-from-photo" onClick={this.chooseimage}>
          从相册选择
        </View>
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
      </View>
    );
  }
}
export default Index as ComponentClass<any, PageState>;
