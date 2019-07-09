import React from 'react';
import ArticleTabPage from "../ArticleTabPage";
import MainHeaderBar from "../../widget/MainHeaderBar";
import {View} from "react-native";

export default class App extends React.Component {

    render() {
        return <View style={{flex: 1}}>
            <MainHeaderBar title={"公众号"}/>
            <ArticleTabPage path={'wxarticle/chapters/json'}
                            navigation={this.props.navigation}/>
        </View>
    }
}