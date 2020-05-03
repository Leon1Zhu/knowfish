import { Component, ComponentClass } from "@tarojs/taro";

import { View } from "@tarojs/components";
import "./pageNativeComponent.less";
import "./iconfont.css";
class Props {
  title = "";
  className = "";
  children?;
  onClick?;
}

class State {}

class PageNativeComponent extends Component<Props, State> {
  defaultProps = new Props();

  render() {
    const { title, className, children, onClick } = this.props;
    return (
      <View
        className={`page-native-component ${className}`}
        onClick={() => {
          onClick && onClick();
        }}
      >
        <View className="title-content">
          <View className="title">{title}</View>
          <View className="iconfont iconarrow"></View>
        </View>
        {children}
      </View>
    );
  }
}

export default PageNativeComponent as ComponentClass<Props, State>;
