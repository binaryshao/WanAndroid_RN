import React from 'react';
import ArticleTabPage from "./ArticleTabPage";

export default class App extends React.Component {

    render() {
        return <ArticleTabPage path={'project/tree/json'} navigation={this.props.navigation}/>
    }
}