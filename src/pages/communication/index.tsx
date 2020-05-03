import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Icon } from "@tarojs/components";

import "./index.less";
import { host } from "src/interceptor";
import { errorHandle } from "../utils";

class Props {}

class State {
  articles = [] as any[];
}

class Communication extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: "交流"
  };

  state = new State();

  componentDidShow() {
    if (
      typeof this.$scope.getTabBar === "function" &&
      this.$scope.getTabBar()
    ) {
      this.$scope.getTabBar().setData({
        selected: 1
      });
    }

    // this.getArticles()
  }

  toAddPage = () => {
    Taro.navigateTo({
      url: "/pages/addCommunicate/addCommunicate"
    });
  };

  getArticles = () => {
    const isMyArticle = this.$router.params.isMyArticle;

    Taro.showLoading({
      title: "数据加载中"
    });

    Taro.request({
      url: host + "/api/getAllArticles.do"
    })
      .then(res => {
        this.setState({
          articles: res.data.data
        });

        Taro.hideLoading();
      })
      .catch(err => {
        errorHandle();
      });
  };

  renderCommunicateItem(article: any) {
    return <View>22</View>;
  }

  render() {
    const { articles } = this.state;
    return (
      <View className="communication-page">
        <Icon
          className="clear-icon"
          type="clear"
          size="50"
          color="#05e7cb"
          onClick={this.toAddPage}
        />
        {articles.map(article => this.renderCommunicateItem(article))}
      </View>
    );
  }
}

export default Communication as ComponentClass<Props, State>;
