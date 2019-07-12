import React from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, DeviceEventEmitter} from 'react-native';
import HintUtils from "../../utils/HintUtils";
import HttpUtils from "../../http/HttpUtils";
import * as config from "../../config";

export default class App extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', ''),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            time: '',
            isLoading: false,
        };
    }

    render() {
        const {item} = this.props;
        return <View style={config.container}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.desc]}>
                    标题 :
                </Text>
                <TextInput
                    placeholder={"必填"}
                    defaultValue={item ? item.title : ''}
                    style={styles.input}
                    onChangeText={(text) => {
                        this.setState({title: text})
                    }}
                />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.desc]}>
                    内容 :
                </Text>
                <TextInput
                    placeholder={"必填"}
                    defaultValue={item ? item.content : ''}
                    style={styles.input}
                    onChangeText={(text) => {
                        this.setState({content: text})
                    }}
                />
            </View>
            <TouchableOpacity onPress={() => {
                HintUtils.toast("时间选择器");
            }}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={[styles.desc]}>
                        完成时间 :
                    </Text>
                    <Text style={styles.time}>
                        {item ? item.dateStr : "当天"}
                    </Text>
                    <Image
                        source={require('../../../res/ic_right_arrow.png')}
                        style={{height: 20, width: 20, marginRight: 20}}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.state.isLoading ? null : this.submit.bind(this)}>
                <Text style={styles.submit}>
                    提交
                </Text>
            </TouchableOpacity>
        </View>;
    }

    submit() {
        if (this.state.title === '') {
            HintUtils.toast("请输入标题");
        } else if (this.state.content === '') {
            HintUtils.toast("请输入内容");
        } else if (this.state.time === '') {
            HintUtils.toast("请选择时间");
        } else {
            this.setState({
                isLoading: true
            });
            HttpUtils.post("", {
            })
                .then(result => {
                    HintUtils.toast("成功");
                    DeviceEventEmitter.emit('');
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
    desc: {
        color: config.textColorPrimary,
        fontSize: 16
    },
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
    submit: {
        width: config.SCREEN_WIDTH * 0.7,
        marginTop: 30,
        padding: 15,
        backgroundColor: config.colorPrimary,
        borderRadius: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    time: {
        color: config.textColorSecondary,
        fontSize: 14,
    },
});