import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.less";

class Props {}

class State {}

class SourceOrigin extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: "关于我们"
  };
  render() {
    return (
      <View className="about-us-page">
        <View className="img-content">
          <Image className="home-img" src={require("../../image/icon-0.jpg")} />
        </View>

        <View className="shiyu">南海小渔</View>
        <View className="text">
          <View className="content">
            “识鱼”是中国水产科学研究院南海水产研究所推出的一款识别鱼类的小程序。目前可以识别中国的鱼类约1600种，主要以海水鱼类为主，但也可以识别常见的淡水鱼类。
          </View>
        </View>
        <View className="text">
          <View className="title">项目主持人</View>
          <View className="content name">吕俊霖</View>
        </View>
        <View className="text">
          <View className="title">物种鉴定人员</View>
          <View className="content name">刘岩 江艳娥 李娜 苏天凤 杨长平</View>
        </View>
        <View className="text">
          <View className="title">程序开发人员</View>
          <View className="content name">麦嘉铭 朱亮 蔡海真 熊浩</View>
        </View>
        <View className="text">
          <View className="title">资料收集人员</View>
          <View className="content name">
            王欢欢 洪小帆 陈宇健 全秋梅 吕承帆
          </View>
        </View>
        <View className="text">
          <View className="content">
            如果您在使用本小程序的过程中，想对我们提出一些意见或建议，欢迎留言或发邮件到
            <View className="email">knowfish@scsfri.ac.cn</View>
          </View>
        </View>
      </View>
    );
  }
}

export default SourceOrigin as ComponentClass<Props, State>;
