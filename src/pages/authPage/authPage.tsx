import "./authPage.less";
import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, CoverImage, Button, Image } from "@tarojs/components";

class AuthPage extends Component {
  config: Config = {
    navigationBarTitleText: "服务授权"
  };

  getUserInfo = () => {
    const redUrl = this.$router.params.redUrl;

    console.log(redUrl);

    if (redUrl) {
      Taro.navigateTo({
        url: redUrl
      });
    }

    Taro.switchTab({ url: "/pages/index/index" });
  };

  render() {
    return (
      <View className="auth-page">
        <View className="login-rect-content"></View>
        <View className="loginBg"></View>
        <View className="text">授权服务</View>
        <View className="info-content">
          <Image
            className="small-icon"
            src={require("image/icon-0.jpg")}
          ></Image>
          <View className="info-text">鱼乐鱼趣</View>
        </View>
        <Button open-type="getUserInfo" onGetUserInfo={this.getUserInfo}>
          授权登录
        </Button>
      </View>
    );
  }
}

export default AuthPage as ComponentClass<any, any>;
