import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Image, StyleSheet, RefreshControl
} from 'react-native';
import HttpUtils from "../../http/HttpUtils";
import LoadingView from "../../widget/LoadingView";
import ErrorView from "../../widget/ErrorView";
import EmptyView from "../../widget/EmptyView";
import HeaderBar from "../../widget/HeaderBar";
import * as config from "../../config";
import HintUtils from "../../utils/HintUtils";
import EndView from "../../widget/EndView";

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
        this.getData();
    }

    getData(isLoadingMore) {
        HttpUtils.get("lg/todo/v2/list/" + this.state.pageNo + '/json', null)
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
        return <View style={{flex: 1}}>
            {this.renderHeader()}
            {this.renderContent()}
        </View>;
    }

    renderContent() {
        if (this.state.isLoading) {
            return <LoadingView/>;
        } else if (this.state.isError) {
            return <ErrorView error={this.state.errorInfo} retry={this.retry.bind(this)}/>;
        } else if (this.state.data.length === 0) {
            return <EmptyView retry={this.retry.bind(this)}/>;
        }
        return <FlatList
            style={{backgroundColor: 'lightgrey'}}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index + ""}
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
        />
    }

    renderHeader() {
        return <HeaderBar
            showBack={true}
            title={"待办清单"}
            rightView={<View style={[config.container, {alignItems: 'flex-end',}]}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        HintUtils.toast("跳转新页面，添加todo");
                    }}>
                    <Image
                        source={require('../../../res/ic_add.png')}
                        style={{height: 20, width: 20, marginRight: 20}}
                    />
                </TouchableWithoutFeedback>
            </View>
            }
        />
    }

    renderItem = ({item}) => {
        return <TouchableNativeFeedback onPress={() => {
            HintUtils.toast("跳转新页面，编辑todo");
        }}>
            <View style={styles.itemContainer}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <Text style={styles.normalText}>
                        {item.dateStr}
                    </Text>
                    <Text style={[styles.normalText, {
                        marginLeft: 10,
                        color: item.status === 0 ? config.colorPrimaryDark : config.textColorSecondary
                    }]}>
                        {item.status === 0 ? "未完成" : "已完成"}
                    </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
                    <Text style={[styles.normalText, {flex: 1}]} numberOfLines={1} ellipsizeMode={'tail'}>
                        {item.content}
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            HintUtils.alert("删除任务", "确定要删除任务【" + item.title + "】吗？", () => {
                                HintUtils.toast("调取接口删除todo，成功后刷新列表");
                            })
                        }}>
                        <Image
                            source={require('../../../res/ic_delete_item.png')}
                            style={{height: 20, width: 20}}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </TouchableNativeFeedback>
    };

    loadMore() {
        this.setState({isLoadMoreFailed: false});
        this.getData(true);
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
    },
    title: {
        flex: 1,
        fontSize: 18,
        color: config.textColorPrimary,
    },
    normalText: {
        fontSize: 14,
        color: config.textColorSecondary,
    },
});