import {NativeModules} from 'react-native';
import Toast from 'react-native-root-toast';

const alertShow = false;

const isDev = () => {
    const {scriptURL} = NativeModules.SourceCode;
    return scriptURL.split('&')[1] === 'dev=true';
};

export default class HintUtils {
    static logOrAlert(msg) {
        if (isDev()) {
            if (alertShow) {
                alert(msg);
            } else {
                console.log(msg)
            }
        }
    }

    static toast(msg) {
        Toast.show(msg, {
            position: Toast.positions.CENTER,
            backgroundColor: 'black',
            opacity: 0.7,
            animation: true,
            textStyle: {
                fontSize: 14
            },
        })
    }

}