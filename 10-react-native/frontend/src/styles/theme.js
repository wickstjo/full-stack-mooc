import { Platform } from 'react-native';

const fonts = {
    fontFamily: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System',
    })
}

export {
    fonts
}