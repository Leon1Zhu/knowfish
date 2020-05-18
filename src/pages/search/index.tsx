import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Input } from "@tarojs/components";
import SearchList from "../commons/searchList";

import "./index.less";
import API from "src/services/mods";
import { connect } from "@tarojs/redux";
import EmptyContent from "../commons/emptyContent";

const searchList = [
  { name: "鲤鱼", latinname: "Cyprinus" },
  { name: "鲈鱼", latinname: "Lateolabrax_japonicus" },
  { name: "真鲷", latinname: "Pagrosomus_major" },
  { name: "金线鱼", latinname: "Nemipterus" },
  { name: "红娘鱼", latinname: "Lepidotrigla" },
  { name: "翻车鲀", latinname: "Mola_mola" }
];

type PageStateProps = {
  searchResultReducer: {
    cameraSearchResult: any[];
  };
};

class State {
  searchData: any[];

  searchKey = "";
}
@connect(({ searchResultReducer }) => {
  return {
    searchResultReducer
  };
})
class SearchPage extends Component<PageStateProps, State> {
  state = new State();

  constructor(props) {
    super(props);
    this.state.searchData = [];
  }

  config: Config = {
    navigationBarTitleText: "搜索"
  };

  componentDidMount() {
    const fromPage = this.$router.params.fromPage;
    if (fromPage === "camera") {
      this.setState({
        searchData: this.props.searchResultReducer.cameraSearchResult
      });
    }
  }

  componentWillReceiveProps(nextProps: PageStateProps) {
    if (
      nextProps.searchResultReducer.cameraSearchResult !==
      this.props.searchResultReducer.cameraSearchResult
    ) {
      this.setState({
        searchData: nextProps.searchResultReducer.cameraSearchResult
      });
    }
  }

  toScan(res) {
    Taro.navigateTo({
      url: "/pages/camera/camera"
    });
  }

  handleInput(e) {
    const searchValue = e.detail.value;

    this.setState({
      searchKey: searchValue
    });
    Taro.showLoading({
      title: "搜索中"
    });
    // 搜索接口
    API.andriod.getInfoByBlurName
      .request({
        name: searchValue
      })
      .then(res => {
        Taro.hideLoading();
        this.setState({
          searchData: res.data
        });
      });
  }

  goDetailPage = (latinName: string) => {
    Taro.navigateTo({
      url: `/pages/detail/index?latinName=${latinName}`
    });
  };

  render() {
    const { searchData, searchKey } = this.state;

    return (
      <View className="search-page">
        <View className="search-input-content">
          <View className="iconfont iconfangdajing"></View>
          <Input
            onInput={this.handleInput}
            type="text"
            placeholder="请输入搜索名称"
            focus
          />
          <View onClick={this.toScan} className="iconfont iconcamera"></View>
        </View>

        {searchData && searchData.length < 1 && !searchKey ? (
          <View className="person-serarch-list">
            <View className="person-search-text">大家都在搜</View>
            <View className="list-content">
              {searchList.map(item => {
                return (
                  <View
                    key={item.latinname}
                    className="list-item"
                    onClick={this.goDetailPage.bind(this, item.latinname)}
                  >
                    <text>{item.name}</text>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          searchData &&
          searchData.length > 0 &&
          !!searchKey && <EmptyContent content="暂无数据"></EmptyContent>
        )}

        {searchData && searchData.length > 0 && (
          <SearchList data={searchData}></SearchList>
        )}
      </View>
    );
  }
}

export default SearchPage as ComponentClass<any, State>;
