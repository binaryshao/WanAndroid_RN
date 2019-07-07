import React from 'react';
import ArticleTabPage from "../ArticleTabPage";

export default class App extends React.Component {

    static navigationOptions = {
        title: "项目",
    };

    render() {
        return <ArticleTabPage path={'project/tree/json'} navigation={this.props.navigation}/>
    }
}