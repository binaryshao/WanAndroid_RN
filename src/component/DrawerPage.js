import React from 'react';
import {View,ScrollView, Image, Text, TouchableHighlight, StyleSheet, DeviceEventEmitter} from 'react-native';
import * as config from "../config"
import HintUtils from "../utils/HintUtils";
import AccountUtils from "../utils/AccountUtils";
import HttpUtils from "../http/HttpUtils";

let loginSubscription;

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    componentDidMount() {
        loginSubscription = DeviceEventEmitter.addListener('login', this.refreshUser.bind(this));
        this.refreshUser();
    }

    refreshUser() {
        AccountUtils.getUserName()
            .then(name => {
                this.setState({
                    userName: name,
                })
            });
    }

    componentWillUnmount(): void {
        DeviceEventEmitter.removeSubscription(loginSubscription);
    }

    render() {
        return <ScrollView>
            <TouchableHighlight onPress={() => {
                if (this.state.userName) {
                    HintUtils.toast('你好...' + this.state.userName)
                } else {
                    this.props.navigation.navigate('Login');
                }
            }}>
                <View style={styles.header}>
                    <Image style={styles.avatar} source={require('../../res/ic_avatar.png')}/>
                    <Text style={styles.userName}>
                        {this.state.userName ? this.state.userName : "还没有登录..."}
                    </Text>
                </View>
            </TouchableHighlight>
            {this.getItemView("收藏夹", require('../../res/ic_favorite_not.png'), () => {
                if (this.state.userName) {
                    this.props.navigation.navigate('Favorite');
                } else {
                    this.props.navigation.navigate('Login');
                    HintUtils.toast("请先登录");
                }
            })}
            {this.getItemView("任务清单", require('../../res/ic_todo.png'), () => {
                if (this.state.userName) {
                    this.props.navigation.navigate('Todo');
                } else {
                    this.props.navigation.navigate('Login');
                    HintUtils.toast("请先登录");
                }
            })}
            {this.getItemView("关于", require('../../res/ic_about.png'), () => {
                this.props.navigation.navigate('About');
            })}
            {this.state.userName ? this.getItemView("退出登录", require('../../res/ic_logout.png'), () => {
                HintUtils.alert("退出登录", "确定要退出吗？", () => {
                    HttpUtils.get('user/logout/json', null)
                        .then(() => {
                            this.logout();
                        })
                });
            }) : null}
        </ScrollView>
    }

    getItemView(action, image, onPress) {
        return <TouchableHighlight onPress={onPress}>
            <View style={styles.itemView}>
                <Image style={styles.actionImage} source={image}/>
                <Text style={styles.action}>
                    {action}
                </Text>
            </View>
        </TouchableHighlight>
    }

    async logout() {
        await AccountUtils.removeUser();
        HintUtils.toast("已退出登录");
        this.setState({
            userName: '',
        });
        DeviceEventEmitter.emit('logout');
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: config.colorPrimary,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 90,
        borderWidth: 2,
        borderColor: 'white',
    },
    userName: {
        color: 'white',
        fontSize: 16,
        marginTop: 20
    },
    itemView: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10
    },
    actionImage: {
        width: 20,
        height: 20,
    },
    action: {
        fontSize: 14,
        color: config.textColorPrimary,
        marginLeft: 15,
    },
});