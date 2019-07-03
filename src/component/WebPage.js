import React from 'react';
import {WebView} from 'react-native-webview';
import ErrorView from "../widget/ErrorView";
import LoadingView from "../widget/LoadingView";

export default class App extends React.Component {

    render() {
        const {navigation} = this.props;
        const title = navigation.getParam('title', '未知标题');
        const url = navigation.getParam('url', 'https://www.wanandroid.com/');
        return <WebView source={{uri: url, method: 'GET'}}
                        startInLoadingState={true}
                        renderLoading={() => <LoadingView/>}
                        renderError={(domain, code, desc) => <ErrorView error={desc}/>}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        scalesPageToFit={false}
        />;
    }
}