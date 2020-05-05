import { Component, ComponentClass } from "@tarojs/taro";
import { View, CoverImage, Image } from "@tarojs/components";
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
        <Image
          className="cover-iamge"
          src={`${host}${record.smallImage}`}
          onClick={() => {
            previewImage([record.fig1]);
          }}
        ></Image>
        <View className="revord-date">{record.date}</View>
      </View>
    );
  }
}

export default RecordCard as ComponentClass<Props, any>;
