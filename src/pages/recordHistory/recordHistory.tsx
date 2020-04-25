import { Component, ComponentClass } from "@tarojs/taro";
import { View, CoverImage } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import RecordCard from "../commons/recordCard";
import "./recordHistory.less";
import { host } from "src/interceptor";
import { previewImage } from "../utils";

class State {}

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
