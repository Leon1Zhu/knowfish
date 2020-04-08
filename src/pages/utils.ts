export function getMonthAndDay() {
  const timestamp = Date.parse(new Date().toDateString());
  const date = new Date(timestamp);

  //获取月份
  const M = date.getMonth() + 1;
  //获取当日日期
  const D = date.getDate();

  return M + "月" + D + "日";
}
