import * as React from 'react';
import { StyleProp, ViewStyle, TouchableOpacityProps } from 'react-native';

type Props = {
  popover?: React.ReactElement<{}>;
  withPointer?: boolean,
  toggleOnPress?: boolean,
  height?: number | string,
  width?: number | string,
  containerStyle?: StyleProp<ViewStyle>;
  pointerColor?: string,
  onClose?: () => void,
  onOpen?: () => void,
  withOverlay?: boolean,
  overlayColor?: string,
  backgroundColor?: string,
  highlightColor?: string,
  toggleWrapperProps?: TouchableOpacityProps,
};

export default class Tooltip extends React.Component<Props, any> {
  toggleTooltip: () => void;
}
