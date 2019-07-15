import React from 'react';
import {ScrollView, Text, View, StyleSheet, Linking, TouchableWithoutFeedback} from 'react-native';
import * as config from "../config";
import HintUtils from "../utils/HintUtils";

export default class App extends React.Component {

    static navigationOptions = {
        title: "关于我们",
    };

    render() {
        return <ScrollView>
            <View style={[config.container, {justifyContent: 'flex-start', alignItems: 'stretch', padding: 10}]}>
                <Text style={styles.title}>玩安卓-RN</Text>
                {this.getContent("玩 Android 客户端，可以查看各种开发相关的知识，采用 React-Native 开发，内容已经比较完整。")}
                {this.getContent("封装了加载中、空数据、错误、到达最底部等不同状态的视图，在错误时可以点击重新加载，具有较好的用户体验。")}

                <Text style={styles.title}>业务内容</Text>
                {this.getContent("几乎对接了玩安卓的所有 API，主要包括以下内容：")}
                {this.getContent("- 注册、登录")}
                {this.getContent("- 收藏、取消收藏、")}
                {this.getContent("- 新增、编辑待办任务")}
                {this.getContent("- 查看、搜索各类项目和文章")}
                {this.getContent("- 网站导航、知识体系、公众号")}

                <Text style={styles.title}>用到的开源库</Text>
                {this.getContent("react-navigation：界面跳转、创建抽屉布局、创建 Tab 页，创建 HeaderBar（返回按钮、标题、右侧视图）")}
                {this.getContent("async-storage：持久化键值对")}
                {this.getContent("react-native-modal-datetime-picker：时间选择器")}
                {this.getContent("react-native-root-toast：吐司")}
                {this.getContent("react-native-swiper：banner")}
                {this.getContent("react-native-ultimate-listview: 列表，从某些角度来看并不好用")}


                <Text style={styles.title}>感谢</Text>
                {this.getLink("鸿神提供的数据源", 'https://www.wanandroid.com/blog/show/2')}

                <Text style={styles.title}>项目地址</Text>
                {this.getLink("GitHub", 'https://github.com/Sbingo/WanAndroid_RN')}
                {this.getContent("如果发现 bug，欢迎大家发起 issue 或提交 PR")}
                {this.getContent("如果觉得项目还不错，点个 star 鼓励下作者吧 o(╥﹏╥)o")}
            </View>
        </ScrollView>
    }

    getContent(content) {
        return <Text style={styles.content}> {content}</Text>
    }

    getLink(title, url) {
        return <TouchableWithoutFeedback onPress={() => {
            if (Linking.canOpenURL(url)) {
                Linking.openURL(url).catch(error => {
                    HintUtils.toast(error)
                });
            } else {
                navigation.navigate('Web', {
                    url: url,
                    title: title
                })
            }
        }}>
            <Text style={styles.link}>
                {title}
            </Text>
        </TouchableWithoutFeedback>
    }
}

const styles = StyleSheet.create({
    title: {
        color: config.textColorPrimary,
        fontSize: 18,
        marginTop: 30,
    },
    content: {
        color: config.textColorSecondary,
        fontSize: 14,
        marginTop: 10,
    },
    link: {
        color: config.colorPrimary,
        fontSize: 16,
        marginTop: 10,
    },
});