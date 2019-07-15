import React from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity,
    StyleSheet, DeviceEventEmitter, ScrollView
} from 'react-native';
import HintUtils from "../../utils/HintUtils";
import HttpUtils from "../../http/HttpUtils";
import * as config from "../../config";

let item;

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
            time: this.getToday(),
            isLoading: false,
        };
        item = this.props.navigation.getParam('item');
    }

    componentDidMount() {
        if (item) {
            this.setState({
                title: item.title,
                content: item.content,
                time: item.dateStr,
            })
        }
    }

    render() {
        return <ScrollView>
            <View style={[config.container, {alignItems: 'stretch', padding: 10}]}>
                <View style={[styles.row]}>
                    <Text style={[styles.desc]}>
                        标题 :
                    </Text>
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({title: text})
                        }}
                        placeholder={"必填"}
                        defaultValue={item ? item.title : ''}
                        clearButtonMode={'always'}
                        numberOfLines={1}
                        style={styles.input}
                    />
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.desc]}>
                        内容 :
                    </Text>
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({content: text})
                        }}
                        placeholder={"必填"}
                        defaultValue={item ? item.content : ''}
                        clearButtonMode={'always'}
                        multiline={true}
                        style={[styles.input, {
                            height: 100,
                            textAlign: 'left',
                            textAlignVertical: 'center',
                        }]}
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    HintUtils.toast("时间选择器");
                }}>
                    <View
                        style={[styles.row, {marginTop: 20}]}>
                        <Text style={[styles.desc]}>
                            完成时间 :
                        </Text>
                        <Text style={styles.time}>
                            {item ? item.dateStr : this.getToday()}
                        </Text>
                        <Image
                            source={require('../../../res/ic_right_arrow.png')}
                            style={{height: 12, width: 12}}
                        />
                    </View>
                </TouchableOpacity>
                <View style={{flex: 1, alignItems: 'center', marginTop: 50,}}>
                    <TouchableOpacity onPress={this.state.isLoading ? null : this.submit.bind(this)}>
                        <Text style={styles.submit}>
                            {this.state.isLoading ? "提交中..." : "提交"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>;
    }

    getToday() {
        const date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    submit() {
        if (this.state.title === '') {
            HintUtils.toast("请输入标题");
        } else if (this.state.content === '') {
            HintUtils.toast("请输入内容");
        } else if (this.state.time === '') {
            HintUtils.toast("请选择完成时间");
        } else {
            this.setState({
                isLoading: true
            });
            HttpUtils.post("", {})
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    desc: {
        color: config.textColorPrimary,
        fontSize: 16
    },
    input: {
        flex: 1,
        backgroundColor: 'white',
        marginLeft: 10,
        borderColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    submit: {
        width: config.SCREEN_WIDTH * 0.7,
        padding: 15,
        backgroundColor: config.colorPrimary,
        borderRadius: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    time: {
        flex: 1,
        marginLeft: 10,
        color: config.textColorSecondary,
        fontSize: 14,
    },
});