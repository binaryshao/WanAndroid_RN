import React from 'react';
import ArticleTabPage from "../ArticleTabPage";

export default class App extends React.Component {

    static navigationOptions = {
        title: "公众号",
    };

    render() {
        return <ArticleTabPage path={'wxarticle/chapters/json'} navigation={this.props.navigation}/>
    }
}