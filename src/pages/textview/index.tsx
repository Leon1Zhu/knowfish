import { Component, ComponentClass } from "@tarojs/taro";
import { View, WebView } from "@tarojs/components";

import "./index.less";

class Props {}

class State {
  src = "";
}

class TextView extends Component<Props, State> {
  defaultProps = new Props();
  state = new State();

  componentDidShow() {
    this.setState({
      src: decodeURIComponent(this.$router.params.src)
    });
  }

  render() {
    const { src } = this.state;
    console.log(src);
    return <WebView src={src} />;
  }
}

export default TextView as ComponentClass<Props, State>;
