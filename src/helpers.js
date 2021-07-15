//  @flow

import { Platform, Dimensions, StatusBar } from 'react-native';

const Screen = Dimensions.get('window');
export const ScreenWidth: number = Screen.width;
export const ScreenHeight: number = Screen.height;

export const ActualScreenHeight = Platform.select({
  ios: ScreenHeight,
  android:
    StatusBar.currentHeight > 24
      ? ScreenHeight
      : ScreenHeight - StatusBar.currentHeight,
});

export const isIOS = Platform.OS === 'ios';

export const Colors = {
  darkergray: '#617080',
  overlay_bright: 'rgba(250, 250, 250, 0.70)',
};
