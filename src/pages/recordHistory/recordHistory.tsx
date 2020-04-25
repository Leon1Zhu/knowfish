import { Component, ComponentClass } from "@tarojs/taro";
import { View, CoverImage } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import RecordCard from "../commons/recordCard";
import "./recordHistory.less";
import { host } from "src/interceptor";
import { previewImage } from "../utils";

class State {
  recordInfo: any[] = [];
}

const mockRecord = [
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  },
  {
    smallImage: "/images/a0134.jpg",
    fig1: "/images/fig/fish/ff0133a.jpg",
    date: "2020-01-02"
  }
];

@connect(({ userReducer }) => ({
  userReducer
}))
class RecordHistory extends Component<any, State> {
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
          recordInfo: res.data
        });
      })
      .catch(err => {
        Taro.hideLoading();
        Taro.showModal({
          title: "小提示",
          content: "网络错误",
          showCancel: false,
          success: function(res) {}
        });
      });
  }

  render() {
    return (
      <View className="record-history-page">
        {mockRecord.map(record => {
          return (
            <View className="record-content">
              <CoverImage
                className="cover-iamge"
                src={`${host}${record.smallImage}`}
                onClick={() => {
                  previewImage([record.fig1]);
                }}
              ></CoverImage>
              <View className="revord-date">{record.date}</View>
            </View>
          );
        })}
      </View>
    );
  }
}

export default RecordHistory as ComponentClass<any, State>;
