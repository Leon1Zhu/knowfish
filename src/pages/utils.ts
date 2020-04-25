import { host } from "src/interceptor";
import Taro from "@tarojs/taro";

export function getMonthAndDay() {
  const timestamp = Date.parse(new Date().toDateString());
  const date = new Date(timestamp);

  //获取月份
  const M = date.getMonth() + 1;
  //获取当日日期
  const D = date.getDate();

  return M + "月" + D + "日";
}

export function previewImage(urls: string[] = []) {
  const newUrls = urls.map(url => {
    if (!url.includes(host)) {
      return host + url;
    }
    return url;
  });
  Taro.previewImage({
    urls: newUrls,
    current: newUrls[0]
  });
}
