import React from 'react';
import {View, Text} from 'react-native';
import * as config from "../config";

export default class App extends React.Component {

    render() {
        return <View style={config.container}>
            <Text style={{fontSize: 20}}>{config.LOAD_FAILED}</Text>
            <Text style={{fontSize: 18}}>原因：{this.props.error}</Text>
        </View>
    }
}