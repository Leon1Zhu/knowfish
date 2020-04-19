import { Component } from "@tarojs/taro";
import { ComponentClass } from "react";
import { View, CoverImage } from "@tarojs/components";

import "./searchList.less";
import { host } from "src/interceptor";

type Props = {
  data: any[];
};

class State {
  canShowMatchingRate = false;
}

class SearchList extends Component<any, State> {
  state = new State();

  componentDidMount() {
    const fromPage = this.$router.params.fromPage;
    if (fromPage === "camera") {
      this.setState({
        canShowMatchingRate: true
      });
    }
  }

  goToDetail(data: any) {
    Taro.navigateTo({
      url: `/pages/detail/index?latinName=${data.latinName}`
    });
  }

  renderItem(data: any) {
    const { canShowMatchingRate } = this.state;
    const coverImgUrl = data.smallImage;

    return (
      <View
        className="card-item"
        key={data.latinName}
        onClick={this.goToDetail.bind(this, data)}
      >
        <CoverImage
          className="card-img"
          src={`${host}${coverImgUrl}`}
          // style={`background: url(${host}${coverImgUrl}) no-repeat`}
        />
        <View className="card-right-content">
          <View className="text-content top-content">
            <View>{data.type}</View>
            {canShowMatchingRate && (
              <View className="pi-pei-lv">匹配率98%</View>
            )}
          </View>
          <View className="text-content center-content">
            <View>{data.name}</View>
            <View className="english-name">({data.latinName})</View>
          </View>
          <View className="text-content bottom-content">
            {((data.nickname || "").split("、") || [])
              .filter((item, index) => index <= 1)
              .map(item => {
                return <View key={item}>{item}</View>;
              })}
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <View className="search-list-content">
        {(data || [])
          .filter((item, index) => index < 10)
          .map(item => {
            return this.renderItem(item);
          })}
      </View>
    );
  }
}

export default SearchList as ComponentClass<Props & PageStateProps, State>;
