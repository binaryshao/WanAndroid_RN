import React from 'react';
import {View} from 'react-native';
import * as config from "../config"

export default class LineDivider extends React.Component {

    render() {
        return <View style={{height: 0.5, backgroundColor: config.divider}}/>;
    }
}