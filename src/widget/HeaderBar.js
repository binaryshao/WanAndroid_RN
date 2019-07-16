import React from 'react';
import {View, Text, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import * as config from "../config";
import {withNavigation} from 'react-navigation';
import PropTypes from "prop-types";

class App extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
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
                <Image source={require('../../res/ic_back.png')}
                       style={styles.back}
                       resizeMode='cover'/>
            </TouchableWithoutFeedback> : null}
            <Text style={[styles.title, {marginLeft: (showBack || leftView) ? 35 : 20,}]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                {title}
            </Text>
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

const styles = StyleSheet.create({
    container: {
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