import React, {Component} from "react";
import {Text} from "react-native";
import * as config from "../config";

export default class app extends Component {

    render() {
        return (
            <Text style={{textAlign: 'center', marginBottom: 5, color: config.colorPrimaryDark}}>
                {config.NO_MORE_DATA}
            </Text>
        );
    }
}