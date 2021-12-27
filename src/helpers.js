//  @flow

import { Platform, Dimensions } from 'react-native';

const Screen = Dimensions.get('window');
export const ScreenWidth: number = Screen.width;
export const ScreenHeight: number = Screen.height;
export const isIOS: string = Platform.OS === 'ios';
export const isAndroid: string = Platform.OS === 'android';
export const isWeb: string = Platform.OS === 'web';

export const Colors = {
  darkergray: '#617080',
  overlay_bright: 'rgba(250, 250, 250, 0.70)',
};
