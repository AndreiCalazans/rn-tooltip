//  @flow

import * as React from 'react';
import {
  TouchableOpacity,
  Modal,
  View,
  ViewPropTypes as RNViewPropTypes,
  I18nManager,
} from 'react-native';
import ModalWeb from "modal-react-native-web";
import PropTypes from 'prop-types';

import Triangle from './Triangle';
import { ScreenWidth, ScreenHeight, isIOS, isWeb } from './helpers';
import getTooltipCoordinate from './getTooltipCoordinate';

// type State = {
//   isVisible: boolean,
//   yOffset: number,
//   xOffset: number,
//   elementWidth: number,
//   elementHeight: number,
// };

// type Props = {
//   withPointer: boolean,
//   popover: React.Element,
//   height: number | string,
//   width: number | string,
//   containerStyle: any,
//   pointerColor: string,
//   pointerStyle: {},
//   onClose: () => void,
//   onOpen: () => void,
//   withOverlay: boolean,
//   overlayColor: string,
//   backgroundColor: string,
//   highlightColor: string,
//   toggleWrapperProps: {},
//   actionType: 'press' | 'longPress' | 'none',
// };

const Tooltip = React.forwardRef((props, ref) => {
  const { onClose, withOverlay, onOpen, overlayColor } = props;

  React.useImperativeHandle(ref, () => ({
    toggleTooltip: () => {
      getElementPosition();
      if (isVisible && !isIOS) {
        onClose && onClose();
      }
      setIsVisible(!isVisible);
    }
  }));

  const [isVisible, setIsVisible] = React.useState(false);
  // const [state, setState] = React.useState();
  // const [state, setState] = React.useState();
  // const [state, setState] = React.useState();
  const [state, setState] = React.useState({
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0,
  });

  const renderedElement = React.useRef(null);

  const ModalComponent = React.useMemo(()=> {
    if (isWeb) {
      return ModalWeb;
    }
    return Modal;
  },[])

  const toggleTooltip = () => {
    getElementPosition();
    if (isVisible && !isIOS) {
      onClose && onClose();
    }
    setIsVisible(!isVisible);
  };

  const wrapWithAction = (actionType, children) => {
    switch (actionType) {
      case 'press':
        return (
          <TouchableOpacity
            onPress={toggleTooltip}
            activeOpacity={1}
            {...props.toggleWrapperProps}
          >
            {children}
          </TouchableOpacity>
        );
      case 'longPress':
        return (
          <TouchableOpacity
            onLongPress={toggleTooltip}
            activeOpacity={1}
            {...props.toggleWrapperProps}
          >
            {children}
          </TouchableOpacity>
        );
      default:
        return children;
    }
  };

  const getTooltipStyle = () => {
    const { yOffset, xOffset, elementHeight, elementWidth } = state;
    const {
      height,
      backgroundColor,
      width,
      withPointer,
      containerStyle,
    } = props;

    const { x, y } = getTooltipCoordinate(
      xOffset,
      yOffset,
      elementWidth,
      elementHeight,
      ScreenWidth,
      ScreenHeight,
      width,
      withPointer,
    );

    const tooltipStyle = {
      position: 'absolute',
      left: I18nManager.isRTL ? null : x,
      right: I18nManager.isRTL ? x : null,
      width,
      height,
      backgroundColor,
      // default styles
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      borderRadius: 10,
      padding: 10,
      ...containerStyle,
    };

    const pastMiddleLine = yOffset > y;
    if (pastMiddleLine) {
      tooltipStyle.bottom = ScreenHeight - y;
    } else {
      tooltipStyle.top = y;
    }

    return tooltipStyle;
  };

  const renderPointer = pastMiddleLine => {
    const { yOffset, xOffset, elementHeight, elementWidth } = state;
    const { backgroundColor, pointerColor, pointerStyle } = props;

    return (
      <View
        style={{
          position: 'absolute',
          top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2,
          left: I18nManager.isRTL ? null : xOffset + elementWidth / 2 - 7.5,
          right: I18nManager.isRTL ? xOffset + elementWidth / 2 - 7.5 : null,
        }}
      >
        <Triangle
          style={{
            borderBottomColor: pointerColor || backgroundColor,
            ...pointerStyle,
          }}
          isDown={pastMiddleLine}
        />
      </View>
    );
  };
  const renderContent = withTooltip => {
    const { popover, withPointer, highlightColor, actionType } = props;

    if (!withTooltip)
      return wrapWithAction(actionType, props.children);

    const { yOffset, xOffset, elementWidth, elementHeight } = state;
    const tooltipStyle = getTooltipStyle();
    return (
      <React.Fragment>
        <View
          style={{
            position: 'absolute',
            top: yOffset,
            left: I18nManager.isRTL ? null : xOffset,
            right: I18nManager.isRTL ? xOffset : null,
            backgroundColor: highlightColor,
            overflow: 'visible',
            width: elementWidth,
            height: elementHeight,
          }}
        >
          {props.children}
        </View>
        {withPointer && renderPointer(!tooltipStyle.top)}
        <View style={tooltipStyle}>{popover}</View>
      </React.Fragment>
    );
  };

  React.useEffect(() => {
    // wait to compute onLayout values.
    const timeout = setTimeout(getElementPosition, 500);
    return () => {
      clearTimeout(timeout);
    }
  }, []);

  const getElementPosition = () => {
    renderedElement &&
      renderedElement.current.measureInWindow(
        (pageOffsetX, pageOffsetY, width, height) => {
          setState((prevState) => ({
            ...prevState,
            xOffset: pageOffsetX,
            yOffset: pageOffsetY,
            elementWidth: width,
            elementHeight: height,
          }));
        },
      );
  };

    return (
      <View collapsable={false} ref={renderedElement}>
        {renderContent(false)}
        <ModalComponent
          animationType="fade"
          visible={isVisible}
          transparent
          onDismiss={onClose}
          onShow={onOpen}
          onRequestClose={onClose}
          width={props.width}
          ariaHideApp={false}
        >
          <TouchableOpacity
            style={styles.container(withOverlay, overlayColor)}
            onPress={toggleTooltip}
            activeOpacity={1}
          >
            {renderContent(true)}
          </TouchableOpacity>
        </ModalComponent>
      </View>
    );
});

Tooltip.propTypes = {
  children: PropTypes.element,
  withPointer: PropTypes.bool,
  popover: PropTypes.element,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerStyle: PropTypes.object,
  pointerColor: PropTypes.string,
  pointerStyle: PropTypes.object,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  withOverlay: PropTypes.bool,
  toggleWrapperProps: PropTypes.object,
  overlayColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  highlightColor: PropTypes.string,
  actionType: PropTypes.oneOf(['press', 'longPress', 'none']),
};

Tooltip.defaultProps = {
  toggleWrapperProps: {},
  withOverlay: true,
  highlightColor: 'transparent',
  withPointer: true,
  actionType: 'press',
  height: 40,
  width: 150,
  containerStyle: {},
  pointerStyle: {},
  backgroundColor: '#617080',
  onClose: () => {},
  onOpen: () => {},
};

const styles = {
  container: (withOverlay, overlayColor) => ({
    backgroundColor: withOverlay
      ? overlayColor
        ? overlayColor
        : 'rgba(250, 250, 250, 0.70)'
      : 'transparent',
    flex: 1,
  }),
};

export default Tooltip;