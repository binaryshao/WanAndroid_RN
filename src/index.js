import React from 'react';
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
import AboutPage from "./component/AboutPage";
import EditTodoPage from "./component/login/EditTodoPage";
import SearchPage from "./component/SearchPage";
import SearchResultPage from "./component/SearchResultPage";

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
    Todo: {screen: TodoPage, navigationOptions: () => ({header: null})},
    About: {screen: AboutPage, navigationOptions: () => ({})},
    Search: {screen: SearchPage, navigationOptions: () => ({header: null})},
    SearchResult: {screen: SearchResultPage, navigationOptions: () => ({})},
    EditTodo: {screen: EditTodoPage, navigationOptions: () => ({})},
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