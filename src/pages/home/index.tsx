import Taro, { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, ScrollView, CoverImage, Text, Image } from "@tarojs/components";
import PageNativeComponent from "../commons/pageNativeComponent";
import { connect } from "@tarojs/redux";
import { host } from "src/interceptor";
import { previewImage, tsFormatTime } from "../utils";
import EmptyContent from "../commons/emptyContent";
import "./index.less";

class State {
  userInfo = {} as Taro.UserInfo;

  recordInfo: any[] = [];
}

@connect(({ userReducer }) => ({
  userReducer
}))
class HomePage extends Component<any, State> {
  config: Config = {
    navigationBarTitleText: "我的"
  };

  timmer;

  componentDidShow() {
    if (
      typeof this.$scope.getTabBar === "function" &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 3
      });
    }

    if (this.props.userReducer.loginInfo.openId) {
      this.getRecordData(this.props.userReducer.loginInfo.openId);
    }
  }

  componentDidMount() {
    Taro.getUserInfo().then(userInfo => {
      this.setState({
        userInfo: userInfo.userInfo
      });
    });

    this.timmer = setInterval(() => {
      if (this.props.userReducer.loginInfo.openId) {
        this.getRecordData(this.props.userReducer.loginInfo.openId);

        clearInterval(this.timmer);
      }
    }, 500);
  }

  toMyCommunicationPage = () => {
    wx.switchTab({ url: "/pages/communication/index?isMyArticle=true" });
  };

  getRecordData = (openId: string) => {
    Taro.showLoading({
      title: "数据加载中"
    });

    Taro.request({
      url: host + "/api/getIdentifiedRecords.do",
      data: {
        userId: openId
      }
    })
      .then(res => {
        Taro.hideLoading();
        this.setState({
          recordInfo: res.data.data
        });
      })
      .catch(err => {
        Taro.hideLoading();
        Taro.showModal({
          title: "小提示",
          content: "网络错误",
          showCancel: false
        });
      });
  };

  renderMyRevcord() {
    const { recordInfo } = this.state;

    return (
      <View className="my-record">
        <View className="title">
          <View className="record-text">我的识鱼记录</View>
          <View
            className="allRecord"
            onClick={() => {
              Taro.navigateTo({
                url: "/pages/recordHistory/recordHistory"
              });
            }}
          >
            全部
          </View>
        </View>
        <ScrollView className="scrollview" scrollX style="width: 100%">
          {recordInfo && recordInfo.length > 0 ? (
            recordInfo.map(record => {
              return (
                <View key={record.id} className="record-content">
                  <Image
                    className="cover-iamge"
                    src={`${host}${record.smallImageLink.replace(
                      "/fishing",
                      ""
                    )}`}
                    onClick={() => {
                      previewImage([
                        record.uploadedImageLink.replace("/fishing", "")
                      ]);
                    }}
                  ></Image>
                  <View className="revord-date">
                    {tsFormatTime(record.createTime, "Y-M-D")}
                  </View>
                </View>
              );
            })
          ) : (
            <EmptyContent content="暂无数据"></EmptyContent>
          )}
        </ScrollView>
      </View>
    );
  }

  render() {
    const { userInfo } = this.state;
    return (
      <View className="home-page">
        <View className="user-info">
          <CoverImage
            className="user-header-image"
            src={userInfo.avatarUrl}
          ></CoverImage>
          {userInfo.nickName}
        </View>
        <PageNativeComponent
          className="my-discussion"
          title="我的交流"
          showArrow
          onClick={this.toMyCommunicationPage}
        ></PageNativeComponent>
        {this.renderMyRevcord()}
        <PageNativeComponent
          className="ziliao-origin"
          title="资料来源"
          showArrow
          onClick={() => {
            Taro.navigateTo({
              url: "/pages/sourceOrigin/sourceOrigin"
            });
          }}
        ></PageNativeComponent>
        <PageNativeComponent
          showArrow={false}
          className="about-us"
          title="关于我们"
        >
          <View className="describe">
            <View>
              识鱼目前可识别中国沿海约2500种的鱼类、900种的贝类和300种的甲壳类。
            </View>
            <View>
              识鱼是中国水产科学研究院南海水产研究所资助的一个课题项目，项目成员是来自信息中心和渔业资源室在渔业分类方面的研究人员，在项目的执行过程中，本所与其他高校联合培养的研究生承担了大量的文字资料和图片的收集工作，而程序的前后台程序和算法的开发工作则是由来自杭州阿里巴巴公司的工程师和华南农业大学的学生承担的，在此向这些人表示感谢。
            </View>
          </View>
          <View className="email">
            联系邮箱: <Text>Knowfish@163.com</Text>
          </View>
        </PageNativeComponent>
      </View>
    );
  }
}

export default HomePage as ComponentClass<any, State>;
