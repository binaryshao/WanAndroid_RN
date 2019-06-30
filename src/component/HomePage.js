import React from 'react';
import {Text, View, Platform} from 'react-native';
import {UltimateListView} from "react-native-ultimate-listview";
import * as config from "../config";
import LineDivider from "../widget/LineDivider";
import EmptyView from "../widget/EmptyView";
import ErrorView from "../widget/ErrorView";
import LoadingView from "../widget/LoadingView";
import HttpUtils from "../http/HttpUtils";
import ArticleItemView from "../widget/ArticleItemView"

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            error: false,
            errorInfo: "",
            pageNO: 0
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>;
        } else if (this.state.error) {
            return <ErrorView error={this.state.errorInfo}/>;
        }
        return this.renderData();
    }

    renderData() {
        return <UltimateListView
            ref={ref => this.flatList = ref}
            refreshable={true}
            onFetch={this.getData.bind(this)}
            header={this.renderHeader.bind(this)}
            item={this.renderItem.bind(this)}
            emptyView={this.emptyView.bind(this)}
            separator={this.separator.bind(this)}
            pagination={false}
            firstLoader={false}
            keyExtractor={(item, index) => `${index} - ${item}`}
            waitingSpinnerText={''}
            allLoadedText={config.NO_MORE_DATA}
            refreshableTitlePull={config.PULL_TO_REFRESH}
            refreshableTitleRelease={config.RELEASE_TO_REFRESH}
            refreshableTitleRefreshing={config.REFRESHING}
            refreshableMode={Platform.OS === "ios" ? "advanced" : "basic"}
        />
    }

    getData(page, postRefresh, endFetch) {
        if (page === 1) {
            this.state.pageNO = 0;
        }
        HttpUtils.get("article/list/" + this.state.pageNO + "/json", null, result => {
            this.setState({
                isLoading: false,
                pageNO: this.state.pageNO + 1
            });
            if (postRefresh) {
                postRefresh(result.datas, config.PAGE_COUNT);
            } else {
                this.flatList.postRefresh(result.datas, config.PAGE_COUNT);
            }
        }, error => {
            this.setState({
                isLoading: false,
                error: true,
                errorInfo: error
            });
        });
    }

    renderHeader() {
        return null;
    }

    renderItem(item, index, separators) {
        return <ArticleItemView item={item}/>;
    }

    emptyView() {
        return <EmptyView/>;
    }

    separator() {
        return <LineDivider/>;
    }

}