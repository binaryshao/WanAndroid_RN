import React from 'react';
import {View, Text, FlatList, TouchableNativeFeedback, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import HttpUtils from "../../http/HttpUtils";
import LoadingView from "../../widget/LoadingView";
import ErrorView from "../../widget/ErrorView";
import EmptyView from "../../widget/EmptyView";
import * as config from "../../config";
import LineDivider from "../../widget/LineDivider";

const colors = ['orange', 'red', 'green', 'black', 'fuchsia', 'chocolate', 'hotpink', 'tomato'];
let navigation;

export default class App extends React.Component {

    static navigationOptions = {
        title: "网站导航",
    };

    constructor(props) {
        super(props);
        navigation = this.props.navigation;
        this.state = {
            isLoading: true,
            isError: false,
            errorInfo: "",
            data: []
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        HttpUtils.get("navi/json", null)
            .then(result => {
                this.setState({
                    isLoading: false,
                    isError: false,
                    data: result,
                });
            })
            .catch(error => {
                this.setState({
                    isLoading: false,
                    isError: true,
                    errorInfo: error,
                })
            });
    }

    retry() {
        this.setState({
            isLoading: true,
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
        return <View style={[config.container, {flexDirection: 'row'}]}>
            <FlatList
                data={this.state.data}
                renderItem={this.renderLeftItem.bind(this)}
                keyExtractor={(item, index) => index + ""}
                ItemSeparatorComponent={LineDivider}
            />
            <FlatList
                ref='rightFlatList'
                data={this.state.data}
                renderItem={this.renderRightItem}
                keyExtractor={(item, index) => index + ""}
            />
        </View>;
    }

    renderLeftItem({item, index}) {
        return <TouchableWithoutFeedback onPress={() => {
            this.refs.rightFlatList.scrollToIndex({animated: true, index: index, viewOffset: 0, viewPosition: 0});
        }}>
            <Text style={styles.leftTitle}>
                {item.name}
            </Text>
        </TouchableWithoutFeedback>
    }

    renderRightItem({item}) {
        return <View style={styles.itemContainer}>
            <Text style={styles.title}>
                {item.name}
            </Text>
            <View style={styles.contentContainer}>
                {item.articles.map((value, index) => {
                    let color = colors[index % (colors.length)];
                    return <TouchableNativeFeedback onPress={() => {
                        navigation.navigate('Web', {
                            title: value.title,
                            url: value.link,
                        });
                    }}>
                        <View style={[styles.textContainer, {backgroundColor: color}]}>
                            <Text style={styles.content}>
                                {value.title}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                })}
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    leftTitle: {
        fontSize: 18,
        color: config.textColorPrimary,
        padding: 15,
        width: 120,
        flex: 1,
        textAlign: 'left'
    },
    itemContainer: {
        margin: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        color: config.textColorPrimary,
        marginLeft: 10
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    textContainer: {
        borderRadius: 5,
        padding: 6,
        margin: 5
    },
    content: {
        fontSize: 14,
        color: 'white',
    },
});