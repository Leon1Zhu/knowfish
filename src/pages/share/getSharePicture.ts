/**
 * @author 朱亮
 * @description 生成分享图片
 */
import Taro from "@tarojs/taro";
import * as _ from "loadsh";

export function setPictureBycreateCanvasContext(
  data: [
    Taro.getImageInfo.SuccessCallbackResult,
    Taro.getImageInfo.SuccessCallbackResult,
    Taro.getUserInfo.SuccessCallbackResult
  ],
  fishInfo: any,
  qqmapsdk: any
) {
  const ctx = Taro.createCanvasContext("share-canvas");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, 325, 660);
  ctx.fill();

  ctx.beginPath();
  ctx.drawImage(data[0].path, -88, 0, 496, 330);
  ctx.fill();

  setLines(ctx, fishInfo);

  circleImg(ctx, data[1].path, 240, 570, 40);

  // 绘制底部
  getLocationInfo(ctx, data[2], qqmapsdk);
}

function setLines(ctx: Taro.CanvasContext, fishInfo: any) {
  // ctx.beginPath();
  // ctx.moveTo(0, 300);
  // ctx.lineTo(80, 300);
  // ctx.moveTo(245, 300);
  // ctx.lineTo(325, 300);
  // ctx.setStrokeStyle("#FFFFFF");
  // ctx.lineWidth = 1;

  // ctx.setFontSize(20);
  // ctx.setFillStyle("rgba(255,255,255,0.9)");
  // ctx.fillText("小丑鱼", getTextX("小丑鱼"), 307);
  // ctx.stroke();

  // ctx.beginPath();
  // ctx.arc(100, 300, 2, 0, 2 * Math.PI);
  // ctx.setFillStyle("#FFFFFF");
  // ctx.fill();

  // ctx.beginPath();
  // ctx.arc(220, 300, 2, 0, 2 * Math.PI);
  // ctx.setFillStyle("#FFFFFF");
  // ctx.fill();

  ctx.beginPath();
  ctx.setFontSize(16);
  ctx.setFillStyle("#131313");
  ctx.fillText(fishInfo.name, getNameLeft(fishInfo.name), 360);
  ctx.setFontSize(14);
  setFeature(ctx, fishInfo.feature);
  ctx.stroke();
}

function getNameLeft(name: string) {
  const strLength = name.length * 16;
  return (325 - strLength) / 2;
}

function setFeature(ctx: Taro.CanvasContext, feature: string) {
  const chr = feature.split("");
  let temp = "";
  let row = [] as any[];

  for (var a = 0; a < chr.length; a++) {
    if (
      ctx.measureText(temp).width < 305 &&
      ctx.measureText(temp + chr[a]).width <= 305
    ) {
      temp += chr[a];
    } //context.measureText(text).width  测量文本text的宽度
    else {
      row.push(temp);
      temp = chr[a];
    }
  }
  row.push(temp);

  for (var b = 0; b < row.length; b++) {
    ctx.fillText(row[b], 10, 370 + (b + 1) * 20); //字体20，间隔24。类似行高
  }
}

function getLocationInfo(
  ctx: Taro.CanvasContext,
  userInfo: Taro.getUserInfo.SuccessCallbackResult,
  qqmapsdk: any
) {
  Taro.getLocation({
    type: "gcj02",
    success(res) {
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        complete: function(res) {
          const userText = `${_.get(
            userInfo,
            "userInfo.nickName",
            ""
          )} 拍摄于 ${_.get(res, "result.address_component.city", "")}`;

          setFootContent(userText, userInfo, ctx);
        }
      });
    }
  });
}

function setFootContent(
  userText: string,
  userInfo: Taro.getUserInfo.SuccessCallbackResult,
  ctx: Taro.CanvasContext
) {
  wx.getImageInfo({
    src: _.get(userInfo, "userInfo.avatarUrl", ""),
    success(res) {
      circleImg(ctx, res.path, 20, 600, 25);
      ctx.beginPath();
      ctx.setFontSize(10);
      ctx.setFillStyle("rgba(0,0,0,0.4)");
      ctx.fillText(userText, 74, 617);
      ctx.fillText("南海小渔 | 长按小程序拍照识鱼", 74, 637);

      ctx.stroke();
      ctx.draw();

      Taro.hideLoading();
    }
  });
}

function getTextX(text) {
  const length = text.length || 0;

  const x = (140 - length * 18) / 2 + 90;

  return x;
}

/** 画原型图片 */
export function circleImg(ctx, img, x, y, r) {
  ctx.save();
  var d = 2 * r;
  var cx = x + r;
  var cy = y + r;
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.clip();
  ctx.drawImage(img, x, y, d, d);
  ctx.restore();
}
