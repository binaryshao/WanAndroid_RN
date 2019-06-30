import React from 'react';
import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';
import MainPage from "./component/MainPage"
import DrawerPage from "./component/DrawerPage"
import WebPage from "./component/WebPage";
import KnowledgePage from "./component/KnowledgePage";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import FavoritePage from "./component/FavoritePage";

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
        navigationOptions: {
            title: "WanAndroid",
        }
    });

const pages = {
    Home: {screen: Main, navigationOptions: () => ({})},
    Web: {screen: WebPage, navigationOptions: () => ({header: null})},
    Knowledge: {screen: KnowledgePage, navigationOptions: () => ({header: null})},
    Login: {screen: LoginPage, navigationOptions: () => ({header: null})},
    Register: {screen: RegisterPage, navigationOptions: () => ({header: null})},
    Favorite: {screen: FavoritePage, navigationOptions: () => ({header: null})},
};

export default createAppContainer(createStackNavigator(pages, {
    initialRouteName: "Home",
    navigationOptions: ({navigation, screenProps}) => ({
        gesturesEnabled: true,
    }),
}));