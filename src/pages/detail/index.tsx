import "./index.less";
import { Component, ComponentClass } from "@tarojs/taro";
import { View } from "@tarojs/components";
import API from "src/services/mods";

class Props {
  latinName = "";
}

class State {
  data: any;
}

class DetailPage extends Component<Props, State> {
  defaultProps = new Props();

  componentDidMount() {
    this.initData();
  }

  initData() {
    const latinName = this.$router.params.latinName;
    Taro.showLoading({
      title: "数据加载中"
    });
    API.andriod.getInfoByLatinName
      .request({
        latinName: latinName
      })
      .then(res => {
        this.setState({
          data: res.data
        });

        Taro.setNavigationBarTitle({
          title: res.data.name
        });
        Taro.hideLoading();
      });
  }

  renderFishInfo(title: string, content: string) {
    return (
      <View className="info-item">
        <View className="info-title">{title}</View>
        <View className="info-content">{content}</View>
      </View>
    );
  }

  render() {
    const { data } = this.state;
    return (
      <View className="detail-page">
        <View className="detail-info">
          <View className="name-infos">
            <View className="ke-shu">xxx科属</View>
            <View className="name">小丑鱼</View>
            <View className="latinname">my english name</View>
          </View>
          {this.renderFishInfo("俗名", "xxx")}
          {this.renderFishInfo("识别特征", "xxx")}
          {this.renderFishInfo("生活习性", "xxx")}
          {this.renderFishInfo("地理分布", "xxx")}
          {this.renderFishInfo("数据来源", "xxx")}
        </View>
      </View>
    );
  }
}

export default DetailPage as ComponentClass<any, State>;
