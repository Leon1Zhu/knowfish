import "./emptyContent.less";
import { Component, ComponentClass } from "@tarojs/taro";
import { View, CoverImage } from "@tarojs/components";

class Props {
  content = "";
}

class EmptyContent extends Component<Props, any> {
  defaultProps = new Props();

  render() {
    const { content } = this.props;
    return (
      <View className="empty-content">
        <View className="empty-image">
          <image
            class="empty-image-content"
            src={require("image/empty.png")}
          ></image>
        </View>
        <View className="content">{content}</View>
      </View>
    );
  }
}

export default EmptyContent as ComponentClass<Props, any>;
