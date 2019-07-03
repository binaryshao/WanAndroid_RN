import React, {PureComponent} from "react";
import {StyleSheet, Text, View, Image, TouchableNativeFeedback} from "react-native";
import * as config from "../config";

export default class App extends PureComponent {

    render() {
        const {navigation, item} = this.props;
        return <TouchableNativeFeedback onPress={() => {
            navigation.navigate('Web', {
                url: item.link,
                title: item.title
            })
        }}>
            <View style={styles.item}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={styles.normalText}>
                        {item.author}
                    </Text>
                    <Text style={[styles.normalText, {color: 'red', marginLeft: 5}]}>
                        {item.fresh ? "新" : ""}
                    </Text>
                    <Text style={[styles.normalText, {color: 'red', marginLeft: 5}]}>
                        {item.isTop ? "置顶" : ""}
                    </Text>
                    <Text style={[styles.normalText, {flex: 1, textAlign: 'right'}]}>
                        {item.niceDate}
                    </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                    {this.getImage(item)}
                    <View style={{flex: 1}}>
                        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'tail'}>
                            {item.title}
                        </Text>
                        {this.getDesc(item)}
                    </View>
                </View>
                <Text style={[styles.normalText, {marginTop: 5}]}>
                    {item.superChapterName}/{item.chapterName}
                </Text>
            </View>
        </TouchableNativeFeedback>
    }

    getImage(item) {
        if (item.envelopePic) {
            return <Image
                source={{uri: item.envelopePic}}
                style={{width: 120, height: 100, marginRight: 5, borderRadius: 8}}
            />;
        } else {
            return null;
        }
    }

    getDesc(item) {
        if (item.desc) {
            return <Text style={[styles.normalText, {marginTop: 10}]} numberOfLines={3} ellipsizeMode={'tail'}>
                {item.desc}
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