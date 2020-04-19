/**
 * @author 朱亮
 * @description 图片分享查看页
 */

import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Button, CoverView, CoverImage } from "@tarojs/components";
import API from "src/services/mods";

import "./shareDetail.less";
import { host } from "src/interceptor";

class State {
  userInfo: any = {};
  fishData: any = {};
}

class ShareDetailPage extends Component<any, State> {
  state = new State();
  config: Config = {
    navigationBarTitleText: "详情页"
  };

  componentDidMount() {
    console.log(this.$router);
    const latinName = this.$router.params.latinName;
    Taro.showLoading({
      title: "加载中"
    });
    API.andriod.getInfoByLatinName
      .request({
        latinName
      })
      .then(res => {
        Taro.hideLoading();
        this.setState({
          fishData: res.data
        });
      });

    Taro.getUserInfo().then(res => {
      this.setState({
        userInfo: res.userInfo
      });
    });
  }

  onShareAppMessage(res) {
    const { fishData } = this.state;
    return {
      title: fishData.name,
      path: `/page/shareDetail?id=${this.$router.params.id}`
    };
  }

  render() {
    const { userInfo, fishData } = this.state;
    return (
      <View className="share-detail">
        <View className="fish-name">孝顺竹</View>
        <CoverView className="play">
          <CoverImage className="img" src={`${host}${fishData.smallImage}`} />
        </CoverView>
        <View className="user-info">
          <CoverView className="user-head left-content">
            <CoverImage className="head" src={`${userInfo.avatarUrl}`} />
            <CoverView className="user-name">{userInfo.nickName}</CoverView>
          </CoverView>

          {/* <View className="right-content">8小时前</View> */}
        </View>

        <Button className="share-btn" openType="share">
          分享
        </Button>
      </View>
    );
  }
}

export default ShareDetailPage as ComponentClass<any, any>;
