import {NativeModules, Alert} from 'react-native';
import Toast from 'react-native-root-toast';

const alertShow = false;

const isDev = () => {
    const {scriptURL} = NativeModules.SourceCode;
    return scriptURL.split('&')[1] === 'dev=true';
};

export default class HintUtils {
    static logOrAlert(msg) {
        if (__DEV__) {
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
            duration: Toast.durations.SHORT,
            backgroundColor: 'black',
            opacity: 0.7,
            animation: true,
            textStyle: {
                fontSize: 14
            },
        })
    }

    static alert(title, msg, onConfirm, onCancel) {
        Alert.alert(title, msg, [
            {text: "确定", onPress: onConfirm,},
            {text: "取消", onPress: onCancel}
        ], {cancelable: false});
    }

}