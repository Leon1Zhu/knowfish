import "./knowledge.less";
import { Component, ComponentClass } from "@tarojs/taro";
import { View } from "@tarojs/components";
import EmptyContent from "../commons/emptyContent";

class Props {}

class State {}

class Knowledge extends Component<Props, State> {
  render() {
    return (
      <View className="knowledge-page">
        <EmptyContent content="敬请期待"></EmptyContent>
      </View>
    );
  }
}

export default Knowledge as ComponentClass<Props, State>;
