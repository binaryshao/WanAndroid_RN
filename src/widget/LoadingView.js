import React, {Component} from "react";
import {ActivityIndicator, View, Text} from "react-native";
import * as config from "../config";

export default class app extends Component {

    render() {
        return (
            <View style={[config.container, {flexDirection: "row"}]}>
                <ActivityIndicator
                    animating={true}
                    style={{height: 60}}
                    color={config.colorAccent}
                    size={this.props.size ? this.props.size : 'large'}
                />
                <Text style={{fontSize: 20}}>{config.LOADING}</Text>
            </View>
        );
    }
}