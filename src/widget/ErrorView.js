import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import * as config from "../config";

export default class App extends React.Component {

    render() {
        return <TouchableWithoutFeedback onPress={this.props.retry}>
            <View style={config.container}>
                <Text style={{fontSize: 20}}>{config.LOAD_FAILED}</Text>
                {this.props.retry ? <Text style={{fontSize: 20}}>{config.CLICK4RETRY}</Text> : null}
                <Text style={{fontSize: 18}}>{this.props.error}</Text>
            </View>
        </TouchableWithoutFeedback>;
    }
}