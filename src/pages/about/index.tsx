import { Component, ComponentClass, Config } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.less";

class Props {}

class State {}

class SourceOrigin extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: "关于我们"
  };
  render() {
    return (
      <View className="about-us-page">
        <View className="img-content">
          <Image className="home-img" src={require("../../image/icon-0.jpg")} />
        </View>

        <View className="shiyu">南海小渔</View>
        <View className="text">
          <View className="content">
            “南海小渔”是中国水产科学研究院南海水产研究所“识鱼”团队推出的一款综合性水产物种识别工具。可以识别常见的鱼类、虾蟹类、贝类等共300多种，大部分可以精确到种，小部分种类因为体态较为相似的原因，只能精确到属。由于鱼类的识别受到很多因素的制约，比如水的反射、折射，鱼的体形、体态，以及在生活环境中的拟色、拟态等等，目前的人工智能识别仍有许多不够完善地地方，需要在今后中继续加以改进。因此，如果您在使用过程中，觉得识别结果不够准确，可以在“交流”页面进行提交，有专业人士帮您进行进一步的判别、鉴定，或者使用“识鱼”、“识虾蟹”和“识贝”等小程序进行再次识别。当然，也可以发邮件到knowfish@scsfri.ac.cn
            向我们反馈，我们将根据您的反馈意见继续加以完善和提高。
          </View>
        </View>
      </View>
    );
  }
}

export default SourceOrigin as ComponentClass<Props, State>;
