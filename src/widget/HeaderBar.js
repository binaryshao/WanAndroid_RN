import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet, Platform} from 'react-native';
import * as config from "../config";
import {withNavigation} from 'react-navigation';
import PropTypes from "prop-types";

class App extends React.Component {

    static propTypes = {
        title: PropTypes.string,
        showBack: PropTypes.bool,
        leftView: PropTypes.element,
        rightView: PropTypes.element,
        onBack: PropTypes.func,
    };

    render() {
        const {title, showBack, leftView, rightView, onBack} = this.props;
        return <View style={styles.container}>
            {leftView ? leftView : null}
            {showBack ? <TouchableWithoutFeedback onPress={this.goBack.bind(this)}>
                <View style={{justifyContent: 'center'}}>
                    <Image source={require('../../res/ic_back.png')}
                           style={styles.back}
                           resizeMode='cover'/>
                </View>
            </TouchableWithoutFeedback> : null}
            <View style={{justifyContent: 'center', marginLeft: (showBack || leftView) ? 35 : 20,}}>
                <Text style={[styles.title]}
                      numberOfLines={1}
                      ellipsizeMode={'tail'}>
                    {title}
                </Text>
            </View>
            {rightView ? rightView : null}
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

const iosPaddingTop = 20;
const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 50 + iosPaddingTop : 50,
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: config.colorPrimary,
        paddingTop: Platform.OS === 'ios' ? iosPaddingTop : 0,
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
        textAlignVertical: 'center',
    },
});

export default withNavigation(App);