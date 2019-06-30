import React from 'react';
import {ToastAndroid} from 'react-native';
import LogUtils from "../utils/LogUtils";

const BASE_URL = "https://www.wanandroid.com/";

const getRequestUrl = (path) => {
    return BASE_URL + path;
};

export default class NetUtils {

    static get(path, params, onNext, onError) {
        let url = getRequestUrl(path);
        LogUtils.show("请求链接：" + url);
        fetch(url, {
            method: 'GET',
            body: params,
            credentials: 'include'
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    LogUtils.show('请求失败：' + response);
                }
            })
            .then((json) => {
                LogUtils.show(url + "返回如下：\n" + JSON.stringify(json, null, "\t"));
                if (json.errorCode.toString() === '0') {
                    onNext(json.data);
                } else {
                    LogUtils.show("业务失败：" + json.errorMsg);
                    ToastAndroid.show(json.errorMsg, ToastAndroid.SHORT);
                    onError(json.errorMsg);
                }
            })
            .catch(error => {
                LogUtils.show("请求出错：" + error);
                ToastAndroid.show("请求出错：" + error, ToastAndroid.SHORT);
                onError(error);
            })
            .done();
    };

    static post(path, params, onNext, onError) {
        fetch(getRequestUrl(path), {
            method: 'POST',
            body: params,
            credentials: 'include',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((json) => {
                if (json.errorCode.toString() === "0") {
                    onNext(json.data);
                } else {
                    onError(json.errorMsg)
                    ToastAndroid.show(json.errorMsg, ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                ToastAndroid.show("请求失败：" + error, ToastAndroid.SHORT);
                alert(error);
            })
            .done();
    };

    request() {

    }

}

