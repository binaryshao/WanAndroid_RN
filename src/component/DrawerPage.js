import React from 'react';
import {View, Image, Text, TouchableNativeFeedback, StyleSheet} from 'react-native';
import * as config from "../config"
import HintUtils from "../utils/HintUtils";
import AccountUtils from "../utils/AccountUtils";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
        };
    }

    componentDidMount() {
        AccountUtils.getUserName()
            .then(name => {
                this.setState({
                    userName: name,
                })
            })
    }

    render() {
        return <View>
            <TouchableNativeFeedback onPress={() => {
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
            </TouchableNativeFeedback>
            {this.getItemView("收藏夹", require('../../res/ic_favorite_not.png'), () => {
                this.props.navigation.navigate('Favorite');
            })}
            {this.getItemView("待办", require('../../res/ic_todo.png'), () => {
                this.props.navigation.navigate('Todo');
            })}
            {this.getItemView("关于", require('../../res/ic_about.png'), () => {
                this.props.navigation.navigate('About');
            })}
            {this.state.userName ? this.getItemView("退出登录", require('../../res/ic_logout.png'), () => {
                HintUtils.toast('to be completed...')
            }) : null}
        </View>
    }

    getItemView(action, image, onPress) {
        return <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.itemView}>
                <Image style={styles.actionImage} source={image}/>
                <Text style={styles.action}>
                    {action}
                </Text>
            </View>
        </TouchableNativeFeedback>
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