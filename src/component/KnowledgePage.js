import React from 'react';
import ArticleTabPage from "./ArticleTabPage";

export default class App extends React.Component {

    render() {
        const nav = this.props.navigation;
        return <ArticleTabPage data={nav.getParam('data')} navigation={nav}/>
    }
}