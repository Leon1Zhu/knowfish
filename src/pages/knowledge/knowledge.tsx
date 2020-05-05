import "./knowledge.less";
import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import EmptyContent from "../commons/emptyContent";

class Props {}

class State {}

class Knowledge extends Component<Props, State> {
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
  }

  render() {
    return (
      <View className="knowledge-page">
        <EmptyContent content="敬请期待"></EmptyContent>
      </View>
    );
  }
}

export default Knowledge as ComponentClass<Props, State>;
