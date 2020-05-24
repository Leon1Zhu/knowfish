import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, CoverImage, Textarea, Button, Image } from "@tarojs/components";
import "./addCommunicate.less";
import { host } from "src/interceptor";
import { connect } from "@tarojs/redux";

class Props {}

class State {
  addPicArrs = [] as any[];

  value = "";

  userInfo;
}

@connect(({ userReducer }) => ({
  userReducer
}))
class AddCommunicate extends Component<any, State> {
  config: Config = {
    navigationBarTitleText: "添加"
  };

  state = new State();

  componentDidMount() {
    Taro.getUserInfo().then(userInfo => {
      this.setState({
        userInfo: userInfo.userInfo
      });
    });
  }

  handleAddPic = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"], // 指定是原图或压缩图，默认二者都有 original,compressed
      sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        setTimeout(() => {
          this.setState({
            addPicArrs: tempFilePaths
          });
        }, 0);
      }
    });
  };

  handlePublish = () => {
    const { addPicArrs, value, userInfo } = this.state;

    console.log({
      articleContent: value,
      user: {
        userId: this.props.userReducer.loginInfo.openId,
        userName: userInfo.nickName,
        userIconUrl: userInfo.avatarUrl
      }
    });

    Taro.uploadFile({
      url: host + "/api/addArticle.do",
      filePath: addPicArrs[0],
      header: {
        "content-type": "application/x-www-form-urlencoded" //修改此处即可
      },
      formData: {
        articleJson: JSON.stringify({
          articleContent: value,
          user: {
            userId: this.props.userReducer.loginInfo.openId,
            userName: userInfo.nickName,
            userIconUrl: userInfo.avatarUrl
          }
        })
      },
      name: "file",
      success: res => {
        wx.switchTab({ url: "/pages/communication/index" });
      },
      fail: function(res) {
        Taro.showToast({
          title: "网络错误",
          icon: "loading",
          duration: 1500
        });
      },
      complete: function(res) {
        Taro.hideLoading();
      }
    });
  };

  render() {
    const { addPicArrs, value } = this.state;
    const disabled = !value || addPicArrs.length < 1;

    return (
      <View className="add-communicate-page">
        <Textarea
          value={value}
          onInput={e => {
            this.setState({
              value: e.detail.value
            });
          }}
          maxlength={50}
          className="add-input"
          placeholder="描述下想和大家交流的鱼，和大家一起分享有趣的小鱼故事哦"
          placeholderClass="input-plac-class"
        />
        {addPicArrs && addPicArrs.length < 1 ? (
          <Image
            className="add-jpg"
            src={require("../../image/add.jpg")}
            onClick={this.handleAddPic}
          ></Image>
        ) : (
          <Image
            className="upload-img"
            src={addPicArrs[0]}
            onClick={this.handleAddPic}
          ></Image>
        )}
        <View className="publlish-content">
          <Button
            className="publish"
            disabled={disabled}
            onClick={this.handlePublish}
          >
            确认发布
          </Button>
        </View>
      </View>
    );
  }
}

export default AddCommunicate as ComponentClass<Props, State>;
