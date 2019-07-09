import React from 'react';
import ArticleTabPage from "../ArticleTabPage";
import MainHeaderBar from "../../widget/MainHeaderBar";
import {View} from "react-native";

export default class App extends React.Component {

    render() {
        return <View style={{flex: 1}}>
            <MainHeaderBar title={"项目"}/>
            <ArticleTabPage path={'project/tree/json'}
                            navigation={this.props.navigation}/>
        </View>
    }
}