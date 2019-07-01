import React, {PureComponent} from "react";
import {StyleSheet, Text, View, Image} from "react-native";
import * as config from "../config";

export default class App extends PureComponent {

    render() {
        return <View style={styles.item}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={styles.normalText}>
                    {this.props.item.author}
                </Text>
                <Text style={[styles.normalText, {color: 'red', marginLeft: 5}]}>
                    {this.props.item.fresh ? "新" : ""}
                </Text>
                <Text style={[styles.normalText, {color: 'red', marginLeft: 5}]}>
                    {this.props.item.isTop ? "置顶" : ""}
                </Text>
                <Text style={[styles.normalText, {flex: 1, textAlign: 'right'}]}>
                    {this.props.item.niceDate}
                </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                {this.getImage()}
                <View style={{flex: 1}}>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>
                        {this.props.item.title}
                    </Text>
                    {this.getDesc()}
                </View>
            </View>
            <Text style={[styles.normalText, {marginTop: 5}]}>
                {this.props.item.superChapterName}/{this.props.item.chapterName}
            </Text>
        </View>
    }

    getImage() {
        if (this.props.item.envelopePic) {
            return <Image
                source={{uri: this.props.item.envelopePic}}
                style={{width: 120, height: 100, marginRight: 5}}
            />;
        } else {
            return null;
        }
    }

    getDesc() {
        if (this.props.item.desc) {
            return <Text style={[styles.normalText, {marginTop: 10}]} numberOfLines={3} ellipsizeMode={'tail'}>
                {this.props.item.desc}
            </Text>;
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: "white",
        flex: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    normalText: {
        fontSize: 14,
        color: config.textColorSecondary,
    },
    title: {
        color: config.textColorPrimary,
        fontSize: 16,
    }
});