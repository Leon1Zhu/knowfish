import Taro, { Component, Config } from "@tarojs/taro";
import { Provider, connect } from "@tarojs/redux";
import { Request } from "./interceptor";
import Index from "./pages/index";
import HomePage from "./pages/home/index";
import { setUserLoginInfo } from "./actions/userAction";

import configStore from "./store";

import "./app.less";
import "./styles/reset.css";
import "./styles/iconfont.css";
import { PontCore } from "./services/pontCore";

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

PontCore.useFetch((url, fetchOption) => {
  return Request(url, fetchOption);
});

class App extends Component<any, any> {
  config: Config = {
    pages: [
      "pages/home/index",
      "pages/recordHistory/recordHistory",
      "pages/index/index",
      "pages/detail/index",
      "pages/authPage/authPage",
      "pages/search/index",
      "pages/share/index",
      "pages/share/shareDetail",
      "pages/camera/camera"
    ],
    permission: {
      "scope.userLocation": {
        desc: "需要获取您的地理位置，请确认授权"
      }
    },
    tabBar: {
      custom: true,
      list: [
        {
          pagePath: "pages/index/index",
          iconPath: "image/home1.png",
          selectedIconPath: "image/home2.png",
          text: "首页"
        },
        // {
        //   pagePath: "pages/index/index",
        //   iconPath: "image/knowledge1.png",
        //   selectedIconPath: "image/knowledge2.png",
        //   text: "知识"
        // },
        // {
        //   pagePath: "pages/index/index",
        //   iconPath: "image/jiaoliu1.png",
        //   selectedIconPath: "image/jiaoliu2.png",
        //   text: "交流"
        // },
        {
          pagePath: "pages/home/index",
          iconPath: "image/me1.png",
          selectedIconPath: "image/me2.png",
          text: "我的"
        }
      ]
    },
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "WeChat",
      navigationBarTextStyle: "black"
    }
  };

  componentDidMount() {
    Taro.getSetting({
      success: res => {
        if (!res.authSetting["scope.userInfo"]) {
          let redirtUrl = this.$router.path || this.$router.params.path;

          const params = this.$router.params;

          (Object.keys(params) || []).map(key => {
            if (!redirtUrl.includes(`${key}=`)) {
              if (redirtUrl.indexOf("?")) {
                redirtUrl = redirtUrl += `?${key}=${params[key]}`;
              } else {
                redirtUrl = redirtUrl += `&${key}=${params[key]}`;
              }
            }
          });

          // 跳转授权页面
          Taro.navigateTo({
            url: `/pages/authPage/authPage?redUrl=/${redirtUrl}`
          });
        }
      }
    });

    // TODO 更新用户信息
    store.dispatch(setUserLoginInfo({ openId: 222 }));
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
