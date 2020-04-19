import "./index.less";
import { Component, ComponentClass } from "@tarojs/taro";
import { View, CoverImage, CoverView, Button } from "@tarojs/components";
import API from "src/services/mods";
import { host } from "src/interceptor";

class Props {
  latinName = "";
}

class State {
  data = {} as any;
}

class DetailPage extends Component<Props, State> {
  defaultProps = new Props();

  state = new State();

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

  handleGoToSharePage() {
    const { data } = this.state;
    Taro.navigateTo({
      url: `/pages/share/index?latinName=${data.latinName}`
    });
  }

  render() {
    const { data } = this.state;
    return (
      <View className="detail-page">
        <CoverView className="image-content">
          <CoverImage
            className="card-img"
            src={`${host}${data.smallImage}`}
          ></CoverImage>
        </CoverView>

        <View className="detail-info">
          <View className="name-infos">
            <View className="ke-shu">{data.type}</View>
            <View className="name">{data.name}</View>
            <View className="latinname">{data.latinName}</View>
          </View>
          {this.renderFishInfo("俗名", data.nickname)}
          {this.renderFishInfo("识别特征", data.feature)}
          {this.renderFishInfo("生活习性", data.livingHabit)}
          {this.renderFishInfo("地理分布", data.area)}
          {this.renderFishInfo("数据来源", data.informationSource)}
        </View>
        <View className="share-content">
          <Button className="share-btn" onClick={this.handleGoToSharePage}>
            分享
          </Button>
        </View>
      </View>
    );
  }
}

export default DetailPage as ComponentClass<any, State>;
