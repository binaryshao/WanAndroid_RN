import {NativeModules} from 'react-native';

const alertShow = false;

const isDev = () => {
    const {scriptURL} = NativeModules.SourceCode;
    return scriptURL.split('&')[1] === 'dev=true';
};

export default class LogUtils {
    static show(msg) {
        if (isDev()) {
            if (alertShow) {
                alert(msg);
            } else {
                console.log(msg)
            }
        }
    }
}