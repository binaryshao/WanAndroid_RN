import React from "react";
import AsyncStorage from '@react-native-community/async-storage';

const userNameKey = 'userName';
const cookieKey = 'cookie';

export default class AccountUtils {
    static saveUserName = (name) => {
        return AsyncStorage.setItem(userNameKey, name);
    };

    static getUserName = () => {
        return AsyncStorage.getItem(userNameKey);
    };

    static removeUser = () => {
        return AsyncStorage.removeItem(userNameKey);
    };

    static saveCookie(cookie) {
        return AsyncStorage.setItem(cookieKey, cookie);
    }

    static getCookie = () => {
        return AsyncStorage.getItem(cookieKey);
    };
}




