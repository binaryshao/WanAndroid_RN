import React from 'react';
import {Image, TouchableWithoutFeedback} from 'react-native';
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import MainPage from "./component/main/MainPage"
import DrawerPage from "./component/DrawerPage"
import WebPage from "./component/WebPage";
import KnowledgePage from "./component/KnowledgePage";
import LoginPage from "./component/login/LoginPage";
import RegisterPage from "./component/login/RegisterPage";
import FavoritePage from "./component/login/FavoritePage";
import * as config from "./config"
import TodoPage from "./component/login/TodoPage";
import AboutPage from "./component/login/AboutPage";
import SearchPage from "./component/SearchPage";

const Main = createDrawerNavigator(
    {
        home: {
            screen: MainPage,
            navigationOptions: {
                drawerLockMode: "unlocked",
            }
        }
    },
    {
        drawerWidth: 250,
        drawerPosition: "left",
        contentComponent: DrawerPage,
        drawerLockMode: "locked-open",
        initialRouteName: 'home',
        contentOptions: {},
    });

const pages = {
    Home: {screen: Main, navigationOptions: () => ({header: null})},
    Web: {screen: WebPage, navigationOptions: () => ({})},
    Knowledge: {screen: KnowledgePage, navigationOptions: () => ({})},
    Login: {screen: LoginPage, navigationOptions: () => ({})},
    Register: {screen: RegisterPage, navigationOptions: () => ({})},
    Favorite: {screen: FavoritePage, navigationOptions: () => ({})},
    Todo: {screen: TodoPage, navigationOptions: () => ({})},
    About: {screen: AboutPage, navigationOptions: () => ({})},
    Search: {screen: SearchPage, navigationOptions: () => ({})},
};

export default createAppContainer(createStackNavigator(pages, {
    initialRouteName: "Home",
    navigationOptions: ({navigation, screenProps}) => ({
        gesturesEnabled: true,
    }),
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: config.colorPrimary,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 16
        },
    },
}));