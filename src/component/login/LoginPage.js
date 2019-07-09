import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, DeviceEventEmitter} from 'react-native';
import HintUtils from "../../utils/HintUtils";
import HttpUtils from "../../http/HttpUtils";
import * as config from "../../config";
import AccountUtils from "../../utils/AccountUtils";

export default class App extends React.Component {

    static navigationOptions = {
        title: "登录",
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            isLoading: false,
        };
    }

    render() {
        return <View style={config.container}>
            <TextInput
                placeholder={"请输入用户名"}
                style={styles.input}
                onChangeText={(text) => {
                    this.setState({userName: text})
                }}
            />
            <TextInput
                placeholder={"请输入密码"}
                style={styles.input}
                onChangeText={(text) => {
                    this.setState({password: text})
                }}
            />
            <TouchableOpacity onPress={this.state.isLoading ? null : this.login.bind(this)}>
                <Text style={styles.login}>
                    {this.state.isLoading ? "登录中..." : "登录"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Register");
            }}>
                <Text style={styles.register}>
                    还没有账号？点击去注册
                </Text>
            </TouchableOpacity>
        </View>;
    }

    login() {
        if (this.state.userName === '') {
            HintUtils.toast("请输入用户名");
        } else if (this.state.password === '') {
            HintUtils.toast("请输入密码");
        } else {
            this.setState({
                isLoading: true
            });
            HttpUtils.post("user/login", {
                username: this.state.userName,
                password: this.state.password
            })
                .then(result => {
                    this.loginSuccess(result.nickname);
                })
                .finally(() => {
                    this.setState({
                        isLoading: false
                    });
                });
        }
    }

    async loginSuccess(name) {
        await AccountUtils.saveUserName(name);
        HintUtils.toast("登录成功");
        DeviceEventEmitter.emit('login');
        this.props.navigation.pop();
    }
}

const styles = StyleSheet.create({
    input: {
        width: config.SCREEN_WIDTH * 0.8,
        height: 50,
        backgroundColor: 'white',
        margin: 10,
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius: 4,
        paddingLeft: 10
    },
    login: {
        width: config.SCREEN_WIDTH * 0.7,
        marginTop: 30,
        padding: 15,
        backgroundColor: config.colorPrimary,
        borderRadius: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    register: {
        color: config.colorPrimaryDark,
        marginTop: 20,
        fontSize: 14,
    },
});