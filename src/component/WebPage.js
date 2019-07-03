import React from 'react';
import {WebView} from 'react-native';
import ErrorView from "../widget/ErrorView";
import LoadingView from "../widget/LoadingView";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>;
        }
        const {navigation} = this.props;
        const title = navigation.getParam('title', '未知标题');
        const url = navigation.getParam('url', 'https://www.wanandroid.com/');
        return <WebView source={{uri: url, method: 'GET'}}
                        renderLoading={this.loadingView.bind(this)}
                        renderError={this.errorView.bind(this)}
                        onLoadEnd={this.loadFinished.bind(this)}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={true}
        />;
    }

    loadingView() {
        return <LoadingView/>;
    }

    errorView(domain, code, desc) {
        return <ErrorView error={desc}/>;
    }

    loadFinished() {
        this.setState({
            isLoading: false
        })
    }
}