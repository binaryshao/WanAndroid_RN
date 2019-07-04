import React from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import HttpUtils from "../http/HttpUtils";
import LoadingView from "../widget/LoadingView";
import ErrorView from "../widget/ErrorView";
import EmptyView from "../widget/EmptyView";
import * as config from "../config";
import ArticleListPage from "./ArticleListPage";

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
        if (this.props.path && this.props.path.length > 0) {
            this.getData();
        } else {
            this.setState({
                isLoading: false,
                isError: true,
                errorInfo: "未传入请求路径！",
            });
        }
    }

    getData() {
        HttpUtils.get(this.props.path, null)
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
                screen: () => <ArticleListPage chapterId={value.id} navigation={this.props.navigation}/>
            }
        });
        return tabPages;
    }

}