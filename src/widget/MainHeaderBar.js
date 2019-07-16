import React from 'react';
import {View, Image, TouchableWithoutFeedback} from 'react-native';
import HeaderBar from "./HeaderBar";
import {withNavigation} from "react-navigation";

class App extends React.Component {

    render() {
        return <HeaderBar
            title={this.props.title}
            leftView={
                <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.toggleDrawer()}>
                    <Image
                        source={require('../../res/ic_drawer.png')}
                        style={{height: 18, width: 18, marginLeft: 20,}}
                    />
                </TouchableWithoutFeedback>
            }
            rightView={
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('Search')}>
                        <Image
                            source={require('../../res/ic_search.png')}
                            style={{height: 20, width: 20, marginRight: 20}}
                        />
                    </TouchableWithoutFeedback>
                </View>
            }
        />
    }
}

export default withNavigation(App);
