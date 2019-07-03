import React from 'react';
import {Text} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import HttpUtils from "../http/HttpUtils";
import LoadingView from "../widget/LoadingView";
import ErrorView from "../widget/ErrorView";
import EmptyView from "../widget/EmptyView";
import * as config from "../config";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isEmpty: false,
            isError: false,
            errorInfo: "",
            data: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        HttpUtils.get("wxarticle/chapters/json", null)
            .then(result => {
                this.setState({
                    isLoading: false,
                    isEmpty: result.length <= 0,
                    data: result
                })
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorInfo: error
                })
            });
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>;
        } else if (this.state.isError) {
            return <ErrorView error={this.state.errorInfo}/>;
        } else if (this.state.isEmpty) {
            return <EmptyView/>
        }
        let A = createAppContainer(createMaterialTopTabNavigator(this.createTabs(), {
            lazy: true,
            swipeEnabled: true,
            animationEnabled: true,
            backBehavior: "none",
            tabBarOptions: {
                activeTintColor: 'white',
                inactiveTintColor: config.colorPrimaryLight,
                scrollEnabled: true,
                tabStyle: {
                    minWidth: 50
                },
                labelStyle: {
                    fontSize: 14,
                },
                indicatorStyle: {
                    height: 2,
                    backgroundColor: 'white'
                },
                style: {
                    backgroundColor: config.colorPrimary,
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center'
                }
            }
        }));
        return <A/>;
    }

    createTabs() {
        let tabPages = {};
        this.state.data.map((value, i) => {
            tabPages[value.name] = {
                screen: () => <Text style={{
                    width: config.SCREEN_WIDTH,
                    textAlign: 'center'
                }}>公众号列表 {i}</Text>
            }
        });
        return tabPages;
    }

}