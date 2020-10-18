import "./index.less";
import { Component, ComponentClass } from "@tarojs/taro";
import { View, CoverImage, CoverView, Button, Image } from "@tarojs/components";
import API from "src/services/mods";
import { host } from "src/interceptor";
import { previewImage } from "../utils";

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
    Taro.request;
    API.andriod.getInfoByLatinName
      .request({
        latinName: latinName
      })
      .then(res => {
        this.setState({
          data: res.data
        });

        Taro.setNavigationBarTitle({
          title: (res.data && res.data.name) || ""
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

  preview_figImage(data) {
    if (
      (data.fig1 && data.fig1 !== "暂缺") ||
      (data.fig2 && data.fig2 !== "暂缺")
    ) {
      const imgs = [] as any[];

      if (data.fig1 && data.fig1 !== "暂缺") {
        imgs.push(data.fig1);
      }

      if (data.fig2 && data.fig2 !== "暂缺") {
        imgs.push(data.fig2);
      }

      previewImage(imgs as string[]);
    }
  }

  render() {
    const { data } = this.state;

    const recognitionRate =
      this.$router.params.recognitionRate &&
      Number(this.$router.params.recognitionRate);

    const recogniText = `置信度：${(recognitionRate as any) * 100 + "%"}`;

    return (
      <View className="detail-page">
        <View
          className="iconfont iconArtboardCopy"
          onClick={this.handleGoToSharePage}
        ></View>
        <Image className="card-img-detail" src={`${host}${data.smallImage}`} />

        <View className="detail-info">
          <View className="name-infos">
            <View className="ke-shu">{data.type}</View>
            <View className="name">{data.name}</View>
            <View className="latinname">{data.latinName}</View>
            {recognitionRate && recognitionRate > -1 && (
              <View className="recognitionRate">{recogniText}</View>
            )}
          </View>

          {recognitionRate > 0.5 ||
          (!recognitionRate && recognitionRate !== 0) ? (
            <View>
              {data.nickname &&
                data.nickname !== "null" &&
                this.renderFishInfo("俗名", data.nickname)}
              {this.renderFishInfo("识别特征", data.feature)}
              {this.renderFishInfo("生活习性", data.livingHabit)}
              <View className="info-item">
                <View className="info-title">参考图</View>
                <View className="info-content">
                  {data.fig1 && (
                    <View
                      className="img-url-content"
                      onClick={this.preview_figImage.bind(this, data)}
                      style={data.fig1 != "暂缺" ? { color: "#1488f5" } : ""}
                    >
                      {data.fig1 != "暂缺" ? "参考图1" : "暂缺"}
                    </View>
                  )}
                  {data.fig2 && data.fig2 != "暂缺" && (
                    <View
                      className="img-url-content"
                      onClick={this.preview_figImage.bind(this, data)}
                      style={data.fig2 != "暂缺" ? { color: "#1488f5" } : ""}
                    >
                      ，参考图2
                    </View>
                  )}
                </View>
              </View>
              {this.renderFishInfo("保护级别", data.level)}
              {this.renderFishInfo("地理分布", data.area)}

              <View className="info-source">
                <View className="info-source-icon">*</View> 资料来源
                {data.informationSource}
              </View>
            </View>
          ) : (
            <View>无法准确识别此物种，请使用其他识别小程序</View>
          )}
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
