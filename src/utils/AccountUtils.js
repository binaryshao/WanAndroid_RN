import AsyncStorage from '@react-native-community/async-storage';

export default class AccountUtils {
    static saveUserName = (name) => {
        return AsyncStorage.setItem('userName', name);
    };

    static getUserName = () => {
        return AsyncStorage.getItem('userName');
    };
}


