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
                    <View style={{paddingLeft: 20, justifyContent: 'center'}}>
                        <Image
                            source={require('../../res/ic_drawer.png')}
                            style={{height: 16, width: 16,}}
                        />
                    </View>
                </TouchableWithoutFeedback>
            }
            rightView={
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'stretch'}}>
                    <TouchableWithoutFeedback
                        onPress={() => this.props.navigation.navigate('Search')}>
                        <View style={{justifyContent: 'center'}}>
                            <Image
                                source={require('../../res/ic_search.png')}
                                style={{height: 20, width: 20, marginRight: 20}}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            }
        />
    }
}

export default withNavigation(App);
