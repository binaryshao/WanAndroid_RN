import React from 'react';
import {
    Text, View, Image, Platform, StyleSheet,
    TouchableNativeFeedback, SafeAreaView, StatusBar
} from 'react-native';
import {UltimateListView} from "react-native-ultimate-listview";
import Swiper from 'react-native-swiper';
import * as config from "../../config";
import LineDivider from "../../widget/LineDivider";
import EmptyView from "../../widget/EmptyView";
import ErrorView from "../../widget/ErrorView";
import LoadingView from "../../widget/LoadingView";
import HttpUtils from "../../http/HttpUtils";
import ArticleItemView from "../../widget/ArticleItemView"


export default class App extends React.Component {

    static navigationOptions = {
        title: "玩安卓",
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            errorInfo: "",
            pageNo: 0,
            bannerData: [],
            bannerIndex: 0
        };
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingView/>;
        } else if (this.state.isError) {
            return <ErrorView error={this.state.errorInfo} retry={this.retry.bind(this)}/>;
        }
        return this.renderData();
    }

    renderData() {
        return <SafeAreaView>
            <StatusBar
                barStyle="light-content"
                backgroundColor={config.colorPrimaryDark}
            />
            <UltimateListView
                ref={ref => this.flatList = ref}
                refreshable={true}
                refreshableColors={config.refreshColors}
                onFetch={this.getData.bind(this)}
                header={this.renderHeader.bind(this)}
                item={this.renderItem.bind(this)}
                emptyView={this.emptyView.bind(this)}
                separator={this.separator.bind(this)}
                firstLoader={false}
                keyExtractor={(item, index) => `${index} - ${item}`}
                waitingSpinnerText={config.LOADING}
                allLoadedText={config.NO_MORE_DATA}
                refreshableTitlePull={config.PULL_TO_REFRESH}
                refreshableTitleRelease={config.RELEASE_TO_REFRESH}
                refreshableTitleRefreshing={config.REFRESHING}
                refreshableMode={Platform.OS === "ios" ? "advanced" : "basic"}
            />
        </SafeAreaView>
    }

    retry() {
        this.setState({
            isLoading: true,
            pageNo: 0,
        });
        setTimeout(() => {
            this.getData();
        }, 500);
    }

    getData(page, postRefresh, endFetch) {
        if (page === 1 || this.state.pageNo === 0) {
            this.state.pageNo = 0;
            HttpUtils.get("banner/json", null)
                .then(result => {
                    this.setState({
                        bannerData: result
                    })
                })
                .catch(error => {
                    this.onError(error);
                });
            Promise.all([HttpUtils.get("article/top/json", null),
                HttpUtils.get("article/list/0/json", null)])
                .then(result => {
                    result[0].map((value, i) => {
                        value.isTop = true;
                    });
                    this.showArticles([...result[0], ...result[1].datas], postRefresh);
                })
                .catch(error => {
                    this.onError(error);
                });
        } else {
            HttpUtils.get("article/list/" + this.state.pageNo + "/json", null)
                .then(result => {
                    this.showArticles(result.datas, postRefresh);
                })
                .catch(error => {
                    this.onError(error);
                });
        }
    }

    showArticles(result, postRefresh) {
        this.setState({
            isLoading: false,
            pageNo: this.state.pageNo + 1
        });
        if (postRefresh) {
            postRefresh(result, config.PAGE_COUNT);
        } else {
            this.flatList.postRefresh(result, config.PAGE_COUNT);
        }
    }

    onError(error) {
        this.setState({
            isLoading: false,
            isError: true,
            errorInfo: error
        })
    }

    renderHeader() {
        return <View>
            {this.state.bannerData != null && this.state.bannerData.length > 0 ?
                <View style={{height: 180}}>
                    <Swiper
                        ref={r => this.swiper = r}
                        autoplay={true}
                        autoplayTimeout={2}
                        showsPagination={false}
                        onMomentumScrollEnd={(e, state, context) => {
                            this.setState({
                                    bannerIndex: state.index
                                }
                            )
                        }}
                        onTouchStart={() => clearTimeout(this.swiper.autoplayTimer)}
                        onTouchEnd={() => this.swiper.autoplay()}
                    >
                        {
                            this.state.bannerData.map((value, i) => <TouchableNativeFeedback
                                key={'index' + i}
                                onPress={() => {
                                    this.props.navigation.navigate('Web', {
                                        url: value.url,
                                        title: value.title
                                    })
                                }}>
                                <Image resizeMode='stretch' style={{flex: 1}} source={{uri: value.imagePath}}/>
                            </TouchableNativeFeedback>)
                        }
                    </Swiper>
                    <View style={styles.bannerHint}>
                        <Text style={styles.bannerText}
                              numberOfLines={1}>{this.state.bannerData[this.state.bannerIndex].title}</Text>
                        <Text style={[styles.bannerText, {
                            flex: 1,
                            textAlign: 'right'
                        }]}>{this.state.bannerIndex + 1}/{this.state.bannerData.length}</Text>
                    </View>
                </View> : null}
        </View>;
    }

    renderItem(item, index, separators) {
        return <ArticleItemView item={item}/>;
    }

    emptyView() {
        return <EmptyView retry={this.retry.bind(this)}/>;
    }

    separator() {
        return <LineDivider/>;
    }
}

const styles = StyleSheet.create({
    bannerHint: {
        flex: 1,
        width: config.SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'grey',
        opacity: 0.75,
        height: 30,
        bottom: 0,
        paddingStart: 10,
        paddingEnd: 10,
    },
    bannerText: {
        color: 'white',
        fontSize: 16
    }
});