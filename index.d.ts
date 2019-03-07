import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type Props = {
  popover?: React.ReactElement<{}>;
  withPointer?: boolean,
  toggleOnPress?: boolean,
  height?: number,
  width?: number,
  containerStyle?: StyleProp<ViewStyle>;
  pointerColor?: string,
  onClose?: () => void,
  onOpen?: () => void,
  withOverlay?: boolean,
  overlayColor?: string,
  backgroundColor?: string,
  highlightColor?: string,
};

export default class Tooltip extends React.Component<Props, any> {
  toggleTooltip: () => void;
}
