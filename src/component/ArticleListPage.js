import React from 'react';
import {DeviceEventEmitter, FlatList, RefreshControl} from 'react-native';
import HttpUtils from "../http/HttpUtils";
import LoadingView from "../widget/LoadingView";
import ErrorView from "../widget/ErrorView";
import EmptyView from "../widget/EmptyView";
import ArticleItemView from "../widget/ArticleItemView";
import LineDivider from "../widget/LineDivider";
import EndView from "../widget/EndView";
import * as config from "../config";

let loginSubscription, favoriteSubscription;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            errorInfo: "",
            isAllLoaded: false,
            isLoadMoreFailed: false,
            pageNo: 1,
            data: []
        };
    }

    componentDidMount() {
        loginSubscription = DeviceEventEmitter.addListener('login', this.retry.bind(this));
        favoriteSubscription = DeviceEventEmitter.addListener('switchFavorite', this.retry.bind(this));
        this.getData();
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeSubscription(loginSubscription);
        DeviceEventEmitter.removeSubscription(favoriteSubscription);
    }

    getData(isLoadingMore) {
        HttpUtils.get("wxarticle/list/" + this.props.chapterId + "/" + this.state.pageNo + "/json", null)
            .then(result => {
                this.setState({
                    isLoading: false,
                    isError: false,
                    isLoadMoreFailed: false,
                    pageNo: this.state.pageNo + 1,
                    isAllLoaded: this.state.pageNo > result.pageCount,
                    data: isLoadingMore ? [...this.state.data, ...result.datas] : result.datas
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isError: !isLoadingMore,
                    errorInfo: error,
                    isLoadMoreFailed: isLoadingMore,
                })
            });
    }

    retry() {
        this.setState({
            isLoading: true,
            pageNo: 1,
        });
        setTimeout(() => {
            this.getData();
        }, 500);
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>;
        } else if (this.state.isError) {
            return <ErrorView error={this.state.errorInfo} retry={this.retry.bind(this)}/>;
        } else if (this.state.data.length === 0) {
            return <EmptyView retry={this.retry.bind(this)}/>;
        }
        return <FlatList
            data={this.state.data}
            renderItem={(info) => <ArticleItemView item={info.item} navigation={this.props.navigation}/>}
            refreshControl={<RefreshControl
                onRefresh={() => {
                    this.state.pageNo = 1;
                    this.getData();
                }}
                refreshing={this.state.pageNo === 1}
                colors={config.refreshColors}
            />}
            onEndReached={() => {
                if (!this.state.isAllLoaded) {
                    this.loadMore();
                }
            }}
            ListFooterComponent={() => {
                if (this.state.isAllLoaded) {
                    return <EndView/>;
                } else if (this.state.isLoadMoreFailed) {
                    return <ErrorView error={this.state.errorInfo} retry={this.loadMore.bind(this)}/>;
                } else {
                    return <LoadingView size={'small'}/>;
                }
            }}
            keyExtractor={(item, index) => index + ""}
            ItemSeparatorComponent={LineDivider}
        />
    }

    loadMore() {
        this.setState({isLoadMoreFailed: false});
        this.getData(true);
    }
}