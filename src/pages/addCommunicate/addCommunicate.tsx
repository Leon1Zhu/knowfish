import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, CoverImage, Textarea, Button } from "@tarojs/components";
import "./addCommunicate.less";
import { host } from "src/interceptor";
import { connect } from "@tarojs/redux";

class Props {
}

class State {

  addPicArrs = [] as any[];

  value = '';

  userInfo;
}

@connect(({ userReducer }) => ({
  userReducer
}))
class AddCommunicate extends Component<any, State> {

  config: Config = {
    navigationBarTitleText: "添加";
  };

  state = new State();

  componentDidMount() {
    console.log(1)
    Taro.getUserInfo().then(userInfo => {
      console.log(2)
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
        this.setState({
          addPicArrs: tempFilePaths
        })
      }
    });

  }
  
  handlePublish = () => {
    const { addPicArrs, value, userInfo } = this.state;
    Taro.uploadFile({
      url: host + "/api/addArticle.do",
      filePath: addPicArrs[0],
      formData: {
        articleJson:
          {
            articleContent: value,
            user: {
              userId: this.props.userReducer.loginInfo.openId,
              userName: userInfo.nickName
            }
          }
      },
      name: "file",
      success: res => {
        try {
          var code = JSON.parse(res.data).code;
        } catch (e) {
          Taro.showModal({
            title: "小提示",
            content: "网络错误",
            showCancel: false
          });
        }
        if (code == 1) {
          Taro.showModal({
            title: "小提示",
            content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
            showCancel: false
          });
        }
        if (code == 0) {
          var outcome = JSON.parse(res.data).data;
          var ids = [];
          for (var i = 0; i < outcome.length; i++) {
            if (outcome[i].id >= 0 && outcome[i].id <= 9999999) {
              ids.push(outcome[i].id as never);
            }
          }
          if (ids.length == 0) {
            Taro.showModal({
              title: "小提示",
              content: "抱歉,我们暂不能识别该生物,谢谢您的使用",
              showCancel: false
            });
          }

          Taro.navigateTo({
            url: `/pages/detail/index?latinName=${outcome[0] &&
              outcome[0].latinName}`
          });
        }
      },
      fail: function(res) {
        console.log("failed to result");
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
  }

  render() {

    const { addPicArrs, value } = this.state;

    return <View className="add-communicate-page">
      <Textarea value={value} onInput={(e) => {this.setState({
        value: e.detail.value
      })}} className="add-input" placeholder="描述下想和大家交流的鱼，和大家一起分享有趣的小鱼故事哦" placeholderClass="input-plac-class" />
      {addPicArrs && addPicArrs.length < 1 ? <View className="iconfont iconarrow" onClick={this.handleAddPic}></View> : <CoverImage className="upload-img" src={addPicArrs[0]} onClick={this.handleAddPic}></CoverImage>} 
      <View className="publlish-content">
      <Button className="publish" disabled={!value || addPicArrs.length < 1} onClick={this.handlePublish}>确认发布</Button>
      </View>
    </View>;
  }
}

export default AddCommunicate as ComponentClass<Props, State>;
