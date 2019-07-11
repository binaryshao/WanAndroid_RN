import React from 'react';
import HintUtils from "../utils/HintUtils";
import AccountUtils from "../utils/AccountUtils";

const BASE_URL = "https://www.wanandroid.com/";

const getRequestUrl = (path) => {
    return BASE_URL + path;
};

function getFormData(params) {
    let formData = new FormData();
    for (let key in params) {
        formData.append(key, params[key]);
    }
    return formData;
}

async function saveCookie(cookie) {
    return await AccountUtils.saveCookie(cookie);
}

function request(path, config) {
    let url = getRequestUrl(path);
    HintUtils.logOrAlert(config.method + "请求：" + url + "\n参数：\n" + JSON.stringify(config, null, "\t"));
    let request = new Promise((resolve, reject) => {
        fetch(url, config)
            .then(response => {
                HintUtils.logOrAlert(url + " 原始返回如下：\n" + JSON.stringify(response, null, "\t"));
                if (response.ok) {
                    if (response.headers.map.hasOwnProperty('set-cookie')) {
                        const cookie = response.headers.map['set-cookie'];
                        console.log("cookie:" + cookie);
                        saveCookie(cookie);
                    }
                    return response.json();
                } else {
                    let msg = "请求失败";
                    HintUtils.logOrAlert(msg);
                    HintUtils.toast(msg);
                    reject(msg);
                }
            })
            .then(json => {
                HintUtils.logOrAlert(url + " json返回如下：\n" + JSON.stringify(json, null, "\t"));
                if (json) {
                    if (json.errorCode.toString() === '0') {
                        resolve(json.data);
                    } else {
                        let msg = "业务失败：" + json.errorMsg;
                        HintUtils.logOrAlert(msg);
                        HintUtils.toast(msg);
                        reject(msg);
                    }
                }
            })
            .catch(error => {
                let msg = "请求出错：" + error;
                HintUtils.logOrAlert(msg);
                HintUtils.toast(msg);
                reject(msg);
            })
            .done();
    });
    return timeoutRequest(request);
}

function timeoutRequest(originalRequest, timeout = 12000) {
    let timeoutPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("请求超时,请检查网络！");
        }, timeout);
    });
    return Promise.race([originalRequest, timeoutPromise]);
}

export default class NetUtils {

    static get(path, params) {
        let config = {
            method: 'GET',
            body: params,
            credentials: 'include'
        };
        return request(path, config);
    };

    static post(path, params) {
        let config = {
            method: 'POST',
            body: getFormData(params),
            credentials: 'include',
        };
        return request(path, config);
    };
}

