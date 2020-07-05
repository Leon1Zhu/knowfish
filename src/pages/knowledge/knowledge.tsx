import "./knowledge.less";
import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, ScrollView, Image, Text } from "@tarojs/components";
import EmptyContent from "../commons/emptyContent";
import { host } from "src/interceptor";
import { tsFormatTime } from "../utils";

class Props {}

class State {
  texts = [];
}

class Knowledge extends Component<Props, State> {
  state = new State();

  config: Config = {
    navigationBarTitleText: "知识"
  };

  timmer;

  componentDidShow() {
    if (
      typeof this.$scope.getTabBar === "function" &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 1
      });
    }

    Taro.request({
      url: host + "/api/getSubscritionInfo.do"
    }).then(res => {
      this.setState({
        texts: JSON.parse((res.data && res.data.data) || {}).item || []
      });
      Taro.hideLoading();
    });
  }

  render() {
    const { texts } = this.state;
    return (
      <View className="knowledge-page">
        {!texts ||
          (texts.length < 1 && (
            <EmptyContent content="敬请期待"></EmptyContent>
          ))}

        <ScrollView className="scroll_view">
          {texts.map((item: any, index) => {
            const text = item.content.news_item && item.content.news_item[0];
            console.log(text);
            return (
              <View
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/textview/index?src=${encodeURIComponent(
                      text.url
                    )}`
                  });
                }}
                className="text-view"
              >
                <View className="left-content">
                  <View className="top-content">
                    <Text className="title">{text.title}</Text>
                  </View>
                  <View className="bottom-content">
                    <View className="author">{text.author}</View>
                    <View className="time">
                      {tsFormatTime(item.content.create_time * 1000, "Y-M-D")}
                    </View>
                  </View>
                </View>
                <View className="right-content">
                  <Image
                    mode="widthFix"
                    className="text-img"
                    src={text.thumb_url}
                  ></Image>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Knowledge as ComponentClass<Props, State>;
