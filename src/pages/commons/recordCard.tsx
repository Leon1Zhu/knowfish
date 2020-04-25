import { Component, ComponentClass } from "@tarojs/taro";
import { View, CoverImage } from "@tarojs/components";
import { host } from "src/interceptor";
import { previewImage } from "../utils";

import "./recordCard.less";

class Props {
  record = {} as any;
}

class RecordCard extends Component<Props, any> {
  render() {
    const { record } = this.props;

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
  }
}

export default RecordCard as ComponentClass<Props, any>;
