/**
 * @author 朱亮
 * @description 图片分享查看页
 */

import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Button, CoverView, CoverImage } from "@tarojs/components";
import API from "src/services/mods";

import "./shareDetail.less";

class ShareDetailPage extends Component {
  config: Config = {
    navigationBarTitleText: "详情页"
  };

  componentDidMount() {
    // TODO 根据ID 获取详细信息，获取发布用户信息，先获取userinfo

    Taro.getUserInfo().then(res => {
      console.log(res);
    });
  }

  onShareAppMessage(res) {
    return {
      title: "自定义转发标题",
      path: `/page/shareDetail?id=${this.$router.params.id}`
    };
  }

  render() {
    return (
      <View className="share-detail">
        <View className="fish-name">孝顺竹</View>
        <CoverView className="play">
          <CoverImage
            className="img"
            src="https://knowfish.scsfri.ac.cn/images/fig/fish/ff0300a.jpg"
          />
        </CoverView>
        <View className="user-info">
          <CoverView className="user-head left-content">
            <CoverImage
              className="head"
              src="https://wx.qlogo.cn/mmopen/vi_32/QpNbib2l6oB2JYj8V7OeKPXMvuHOUhuFomiaP9WySJR6643WxaFjCa7De6m36Etr4QOl5cHnf46lcLyEJIs0qmWw/132"
            />
            <CoverView className="user-name">朱亮</CoverView>
          </CoverView>

          <View className="right-content">8小时前</View>
        </View>

        <Button className="share-btn" openType="share">
          分享
        </Button>
      </View>
    );
  }
}

export default ShareDetailPage as ComponentClass<any, any>;
