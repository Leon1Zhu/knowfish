Component({
  data: {
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [
      {
        pagePath: "/pages/index/index",
        iconPath: "/image/home1.png",
        selectedIconPath: "/image/home2.png",
        text: "首页"
      },
      {
        pagePath: "/pages/knowledge/knowledge",
        iconPath: "/image/knowledge1.png",
        selectedIconPath: "/image/knowledge2.png",
        text: "知识"
      },
      {
        pagePath: "/pages/communication/index",
        iconPath: "/image/jiaoliu1.png",
        selectedIconPath: "/image/jiaoliu2.png",
        text: "交流"
      },
      {
        pagePath: "/pages/home/index",
        iconPath: "/image/me1.png",
        selectedIconPath: "/image/me2.png",
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
      wx.switchTab({ url });
    }
  }
});
