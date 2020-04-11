import Taro, { Component, Config } from "@tarojs/taro";
import { Provider } from "@tarojs/redux";
import { Request } from "./interceptor";
import Index from "./pages/index";
import SearchPage from "./pages/search";

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

console.log(PontCore);

PontCore.useFetch((url, fetchOption) => {
  return Request(url, fetchOption);
});

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      "pages/search/index",
      "pages/detail/index",
      "pages/index/index",
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
        {
          pagePath: "pages/share/index",
          iconPath: "image/knowledge1.png",
          selectedIconPath: "image/knowledge2.png",
          text: "知识"
        },
        {
          pagePath: "pages/share/shareDetail",
          iconPath: "image/jiaoliu1.png",
          selectedIconPath: "image/jiaoliu2.png",
          text: "交流"
        },
        {
          pagePath: "pages/index/index",
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

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <SearchPage />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById("app"));
