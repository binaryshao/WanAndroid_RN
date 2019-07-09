import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import * as config from "../config";
import {withNavigation} from 'react-navigation';

class App extends React.Component {

    render() {
        return <View style={styles.container}>
            {this.props.showBack ? <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
                <Image source={require('../../res/ic_back.png')}
                       style={styles.back}
                       resizeMode='cover'/>
            </TouchableWithoutFeedback> : null}
            <Text style={[styles.title, {marginLeft: this.props.showBack ? 40 : 20,}]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                {this.props.title}
            </Text>
            {this.props.rightView ? this.props.rightView : null}
        </View>;
    }

    goBack() {
        if (this.props.onBack) {
            this.props.onBack();
        } else {
            this.props.navigation.pop();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: config.SCREEN_WIDTH,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: config.colorPrimary,
    },
    back: {
        height: 15,
        width: 15,
        marginLeft: 20,
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default withNavigation(App);