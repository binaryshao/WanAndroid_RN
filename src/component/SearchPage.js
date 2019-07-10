import React from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Image, StyleSheet
} from 'react-native';
import HttpUtils from "../http/HttpUtils";
import LoadingView from "../widget/LoadingView";
import ErrorView from "../widget/ErrorView";
import EmptyView from "../widget/EmptyView";
import HeaderBar from "../widget/HeaderBar";
import * as config from "../config";
import HintUtils from "../utils/HintUtils";

const colors = ['orange', 'red', 'green', 'black', 'fuchsia', 'chocolate', 'hotpink', 'tomato'];

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isError: false,
            errorInfo: "",
            data: [],
            keywords: "",
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        HttpUtils.get("hotkey/json", null)
            .then(result => {
                this.setState({
                    isLoading: false,
                    isError: false,
                    data: [result],
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
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index + ""}
        />
    }

    renderHeader() {
        return <HeaderBar
            showBack={true}
            rightView={<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TextInput placeholder={"请输入搜索内容..."}
                           placeholderTextColor={'lightgray'}
                           selectionColor={'red'}
                           returnKeyType={'search'}
                           style={{flex: 1, color: 'white', fontSize: 16}}
                           onSubmitEditing={() => {
                               this.search(this.state.keywords);
                           }}
                           onChangeText={(text) => {
                               this.setState({keywords: text})
                           }}/>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.search(this.state.keywords);
                    }}>
                    <Image
                        source={require('../../res/ic_search.png')}
                        style={{height: 20, width: 20, marginRight: 20}}
                    />
                </TouchableWithoutFeedback>
            </View>
            }
        />
    }

    renderItem = ({item}) => {
        return <View style={styles.itemContainer}>
            <Text style={styles.title}>
                热搜
            </Text>
            <View style={styles.contentContainer}>
                {item.map((value) => {
                    let color = colors[Math.ceil(Math.random() * (colors.length - 1))];
                    return <TouchableNativeFeedback onPress={() => {
                        this.search(value.name);
                    }}>
                        <Text style={[styles.content, {color: color}]}>
                            {value.name}
                        </Text>
                    </TouchableNativeFeedback>
                })}
            </View>
        </View>
    }

    search = (keywords) => {
        if (keywords) {
            this.props.navigation.navigate(
                'SearchResult', {
                    keywords: keywords,
                });
        } else {
            HintUtils.toast("请输入搜索内容...");
        }
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        margin: 5,
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        color: config.colorPrimaryDark,
        marginLeft: 15
    },
    contentContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10
    },
    content: {
        fontSize: 15,
        padding: 10,
        margin: 5
    },
});