import {Platform, Dimensions} from 'react-native';

// iPhone X、iPhone XS
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhone XR、iPhone XS Max
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const DEVICE_SIZE = Dimensions.get('window');
const {height, width} = DEVICE_SIZE;

export {DEVICE_SIZE};

export const isiOS = () => Platform.OS === 'ios';

export const isiPhoneX = () => {
    return (
        isiOS() &&
        ((height === X_HEIGHT && width === X_WIDTH) ||
            (height === X_WIDTH && width === X_HEIGHT)) ||
        ((height === XSMAX_HEIGHT && width === XSMAX_WIDTH) ||
            (height === XSMAX_WIDTH && width === XSMAX_HEIGHT))
    );
};