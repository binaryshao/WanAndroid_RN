import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import HintUtils from "../../utils/HintUtils";
import HttpUtils from "../../http/HttpUtils";
import * as config from "../../config";

export default class App extends React.Component {

    static navigationOptions = {
        title: "注册",
    };

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            passwordAgain: '',
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
            <TextInput
                placeholder={"请再次输入密码"}
                style={styles.input}
                onChangeText={(text) => {
                    this.setState({passwordAgain: text})
                }}
            />
            <TouchableOpacity onPress={this.state.isLoading ? null : this.register.bind(this)}>
                <Text style={styles.register}>
                    {this.state.isLoading ? "注册中..." : "注册"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate("Login");
            }}>
                <Text style={styles.login}>
                    已经有账号？点击去登录
                </Text>
            </TouchableOpacity>
        </View>;
    }

    register() {
        if (this.state.userName === '') {
            HintUtils.toast("请输入用户名");
        } else if (this.state.password === '') {
            HintUtils.toast("请输入密码");
        } else if (this.state.passwordAgain === '') {
            HintUtils.toast("请再次输入密码");
        } else if (this.state.password !== this.state.passwordAgain) {
            HintUtils.toast("两次输入的密码不一致");
        } else {
            this.setState({
                isLoading: true
            });
            HttpUtils.post("user/register", {
                username: this.state.userName,
                password: this.state.password,
                repassword: this.state.passwordAgain,
            })
                .then(() => {
                    HintUtils.toast("注册成功");
                    this.props.navigation.pop();
                })
                .finally(() => {
                    this.setState({
                        isLoading: false
                    });
                });
        }
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
    register: {
        width: config.SCREEN_WIDTH * 0.7,
        marginTop: 30,
        padding: 15,
        backgroundColor: config.colorPrimary,
        borderRadius: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    login: {
        color: config.colorPrimaryDark,
        marginTop: 20,
        fontSize: 14,
    },
});