import Taro from "@tarojs/taro";

Component({
  data: {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/image/icon_component.png",
        selectedIconPath: "/image/icon_component_HL.png",
        text: "首页"
      },
      {
        pagePath: "/pages/share/index",
        iconPath: "/image/icon_API.png",
        selectedIconPath: "/image/icon_API_HL.png",
        text: "知识"
      },
      {
        pagePath: "/pages/share/shareDetail",
        iconPath: "/image/icon_API.png",
        selectedIconPath: "/image/icon_API_HL.png",
        text: "交流"
      },
      {
        pagePath: "/pages/index/index",
        iconPath: "/image/icon_API.png",
        selectedIconPath: "/image/icon_API_HL.png",
        text: "我的"
      }
    ]
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      this.setData({
        selected: data.index
      });
      Taro.switchTab({ url });
    }
  }
});
