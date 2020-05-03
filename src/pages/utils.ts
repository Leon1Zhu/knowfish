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

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

/**
 * 时间戳转化为年 月 日 时 分 秒
 * ts: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */
export function tsFormatTime(timestamp, format) {
  const formateArr = ["Y", "M", "D", "h", "m", "s"];
  let returnArr = [];

  let date = new Date(timestamp);
  let year = date.getFullYear() as never;
  let month = (date.getMonth() + 1) as never;
  let day = date.getDate() as never;
  let hour = date.getHours() as never;
  let minute = date.getMinutes() as never;
  let second = date.getSeconds() as never;
  returnArr.push(year, month, day, hour, minute, second);

  returnArr = returnArr.map(formatNumber) as any;

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

export function errorHandle() {
  Taro.hideLoading();
  Taro.showModal({
    title: "小提示",
    content: "网络错误",
    showCancel: false
  });
}

/** 时差计算 */
export function timeago(dateTimeStamp) {
  //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  const minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const halfamonth = day * 15;
  const month = day * 30;
  const now = new Date().getTime(); //获取当前时间毫秒
  console.log(now);
  const diffValue = now - dateTimeStamp; //时间差

  let result = "";

  if (diffValue < 0) {
    return;
  }
  var minC = diffValue / minute; //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  if (monthC >= 1 && monthC <= 3) {
    result = " " + parseInt(monthC as any) + "月前";
  } else if (weekC >= 1 && weekC <= 3) {
    result = " " + parseInt(weekC as any) + "周前";
  } else if (dayC >= 1 && dayC <= 6) {
    result = " " + parseInt(dayC as any) + "天前";
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt(hourC as any) + "小时前";
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC as any) + "分钟前";
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚";
  } else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth =
      datetime.getMonth() + 1 < 10
        ? "0" + (datetime.getMonth() + 1)
        : datetime.getMonth() + 1;
    var Ndate =
      datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var Nhour =
      datetime.getHours() < 10
        ? "0" + datetime.getHours()
        : datetime.getHours();
    var Nminute =
      datetime.getMinutes() < 10
        ? "0" + datetime.getMinutes()
        : datetime.getMinutes();
    var Nsecond =
      datetime.getSeconds() < 10
        ? "0" + datetime.getSeconds()
        : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate;
  }
  return result;
}
