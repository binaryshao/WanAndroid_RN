import AsyncStorage from '@react-native-community/async-storage';

const userNameKey = 'userName';

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
}


