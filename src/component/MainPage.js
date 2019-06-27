import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from "react-navigation";
import HomePage from "./HomePage";
import WeChatPage from "./WeChatPage";
import ProjectPage from "./ProjectPage";
import NavigationPage from "./NavigationPage";
import KnowledgeTreePage from "./KnowledgeTreePage";

export default createBottomTabNavigator({
        Home: {
            screen: HomePage,
            navigationOptions: {
                tabBarLabel: "首页",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={require('../../res/ic_home.png')}
                        style={[styles.tabBar, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        WeChat: {
            screen: WeChatPage,
            navigationOptions: {
                tabBarLabel: "公众号",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={require('../../res/ic_wechat.png')}
                        style={[styles.tabBar, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        Project: {
            screen: ProjectPage,
            navigationOptions: {
                tabBarLabel: "项目",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={require('../../res/ic_project.png')}
                        style={[styles.tabBar, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        Navigation: {
            screen: NavigationPage,
            navigationOptions: {
                tabBarLabel: "网站导航",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={require('../../res/ic_navigation.png')}
                        style={[styles.tabBar, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        KnowledgeTree: {
            screen: KnowledgeTreePage,
            navigationOptions: {
                tabBarLabel: "知识体系",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={require('../../res/ic_dashboard.png')}
                        style={[styles.tabBar, {tintColor: tintColor}]}
                    />
                ),
            }
        }
    },
    {
        lazy: true,
        backBehavior: "none",
        tabBarOptions: {
            inactiveTintColor: "#666666",
            activeTintColor: "#2196F3",
            labelStyle: {
                fontSize: 14,
            }
        }
    });


const styles = StyleSheet.create({
    tabBar: {
        width: 25,
        height: 25
    }
});