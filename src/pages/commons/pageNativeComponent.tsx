import { Component, ComponentClass } from "@tarojs/taro";

import "./pageNativeComponent.less";
import { View } from "@tarojs/components";

class Props {
  title = "";
  className = "";
  children?;
}

class State {}

class PageNativeComponent extends Component<any, State> {
  defaultProps = new Props();

  render() {
    const { title, className, children } = this.props;
    return (
      <View className={`page-native-component ${className}`}>
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
