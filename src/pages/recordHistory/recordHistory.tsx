import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, CoverImage } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./recordHistory.less";
import { host, imgHost } from "src/interceptor";
import { previewImage, tsFormatTime } from "../utils";
import EmptyContent from "../commons/emptyContent";

class State {
  recordInfo: any[] = [];
}

@connect(({ userReducer }) => ({
  userReducer
}))
class RecordHistory extends Component<any, State> {
  config: Config = {
    navigationBarTitleText: "识别记录"
  };

  componentDidMount() {
    Taro.request({
      url: host + "/api/getIdentifiedRecords.do",
      data: {
        userId:
          this.props.userReducer && this.props.userReducer.loginInfo.openId
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
  }

  render() {
    const { recordInfo } = this.state;
    return (
      <View className="record-history-page">
        {recordInfo && recordInfo.length > 0 ? (
          recordInfo.map(record => {
            return (
              <View className="record-content">
                <CoverImage
                  className="cover-iamge"
                  src={`${imgHost}${record.smallImageLink}`}
                  onClick={() => {
                    previewImage([record.uploadedImageLink]);
                  }}
                ></CoverImage>
                <View className="revord-date">
                  {tsFormatTime(record.createTime, "Y-M-D")}
                </View>
              </View>
            );
          })
        ) : (
          <EmptyContent content="暂无数据"></EmptyContent>
        )}
      </View>
    );
  }
}

export default RecordHistory as ComponentClass<any, State>;
