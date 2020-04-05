/**
 * Created by zhuliang on 2019/1/4.
 */
import Fly from "flyio/dist/npm/wx";
import Taro from "@tarojs/taro";

const fly = new Fly();
export const host = "https://knowfish.scsfri.ac.cn/fishing";
fly.interceptors.request.use((request) => {
  request.url = host + request.url;

  //给所有请求添加自定义header
  if (process.env.NODE_ENV === "development") {
    console.log("发出请求");
    console.log(JSON.parse(JSON.stringify(request)));
  }
  return request;
});

fly.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log("收到请求");
      console.log(JSON.parse(JSON.stringify(response)));
    }
    return response.data || response;
  },
  (err) => {
    if (err.status == 0) {
      return "网络连接异常";
    } else if (err.status == 1) {
      return "网络连接超时";
    } else if (err.status == 401) {
      // TODO 跳转到登录页面
      // store.commit('removeToken');
      // store.commit('removeUserInfo');
      // store.commit('removeCurrentTerm');
      // wx.navigateTo({url:'../loginPage/main'})
      return "用户未登录";
    } else {
      if (err.response.data.message) {
        return err.response.data.message;
      } else {
        return "请求数据失败,请稍后再试";
      }
    }
    // Do something with response error
  }
);

export function Request(url, fetchOptions) {
  return fly.request(url, fetchOptions);
}
