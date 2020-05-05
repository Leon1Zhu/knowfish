import { Component, ComponentClass } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./sourceOrigin.less";

class Props {}

class State {}

class SourceOrigin extends Component<Props, State> {
  render() {
    return (
      <View className="source-origin-page">
        <View className="img-content">
          <Image className="home-img" src={require("../../image/icon-0.jpg")} />
        </View>

        <View className="shiyu">南海小渔</View>
        <View className="text">
          本小程序由于种类较多，除了在物种的资料来源中已经注明的外，还引用了以下网站或书籍里的文字资料：
        </View>
        <View className="text">维基百科</View>
        <View className="text">百度百科</View>
        <View className="text">南海鱼类志</View>
        <View className="text">台湾鱼类资料库（fishdb.sinica.edu.tw/）</View>
        <View className="text">世界鱼类资料库（www.Fishbase.org）</View>
      </View>
    );
  }
}

export default SourceOrigin as ComponentClass<Props, State>;
