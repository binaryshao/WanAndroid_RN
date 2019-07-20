import React from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity,
    StyleSheet, DeviceEventEmitter, ScrollView, Switch, Platform
} from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import HintUtils from "../../utils/HintUtils";
import HttpUtils from "../../http/HttpUtils";
import * as config from "../../config";

let item, isAdd;

export default class App extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('isAdd') ? "新建任务" : "编辑任务"
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            dateStr: this.getToday(),
            isLoading: false,
            showPicker: false,
            date: new Date(),
            isCompleted: false
        };
        item = this.props.navigation.getParam('item');
        isAdd = this.props.navigation.getParam('isAdd');
    }

    componentDidMount() {
        if (item) {
            this.setState({
                title: item.title,
                content: item.content,
                dateStr: item.dateStr,
                date: new Date(item.dateStr),
                isCompleted: item.status === 1,
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
                        defaultValue={this.state.title}
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
                        defaultValue={this.state.content}
                        clearButtonMode={'always'}
                        multiline={true}
                        style={[styles.input, {
                            textAlign: 'left',
                            textAlignVertical: 'center',
                            ...Platform.select({
                                ios: {},
                                android: {height: 100}
                            }),
                        }]}
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    this.showPicker();
                }}>
                    <View
                        style={[styles.row]}>
                        <Text style={[styles.desc]}>
                            完成时间 :
                        </Text>
                        <Text
                            style={styles.dateStr}>
                            {this.state.dateStr}
                        </Text>
                        <Image
                            source={require('../../../res/ic_right_arrow.png')}
                            style={{height: 12, width: 12}}
                        />
                    </View>
                </TouchableOpacity>
                {isAdd ? null :
                    <View style={styles.row}>
                        <Text style={[styles.desc]}>
                            是否已完成 :
                        </Text>
                        <Switch
                            style={{marginLeft: 10}}
                            onValueChange={value => {
                                this.setState({isCompleted: value})
                            }}
                            value={this.state.isCompleted}
                        />
                    </View>
                }
                <View style={{flex: 1, alignItems: 'center', marginTop: 50,}}>
                    <TouchableOpacity onPress={this.state.isLoading ? null : this.submit.bind(this)}>
                        <Text style={styles.submit}>
                            {this.state.isLoading ? "提交中..." : "提交"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    isVisible={this.state.showPicker}
                    date={this.state.date}
                    onConfirm={this.setDate}
                    onCancel={this.hidePicker}
                />
            </View>
        </ScrollView>;
    }

    getToday() {
        return this.getDateStr(new Date());
    }

    getDateStr(date) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    setDate = date => {
        this.setState({
            date: date,
            dateStr: this.getDateStr(date),
        });
        this.hidePicker();
    };

    showPicker = () => {
        this.setState({showPicker: true});
    };

    hidePicker = () => {
        this.setState({showPicker: false});
    };

    submit() {
        if (this.state.title === '') {
            HintUtils.toast("请输入标题");
        } else if (this.state.content === '') {
            HintUtils.toast("请输入内容");
        } else if (this.state.dateStr === '') {
            HintUtils.toast("请选择完成时间");
        } else {
            this.setState({
                isLoading: true
            });
            let path, params;
            params = {
                title: this.state.title,
                content: this.state.content,
                date: this.state.dateStr,
            };
            if (isAdd) {
                path = 'lg/todo/add/json';
            } else {
                path = 'lg/todo/update/' + item.id + '/json';
                params.status = this.state.isCompleted ? 1 : 0;
            }
            HttpUtils.post(path, params)
                .then(result => {
                    HintUtils.toast(isAdd ? "新增成功" : "编辑成功");
                    DeviceEventEmitter.emit('Todo');
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
        marginTop: 20
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
    dateStr: {
        flex: 1,
        marginLeft: 10,
        color: config.textColorSecondary,
        fontSize: 14,
    },
});