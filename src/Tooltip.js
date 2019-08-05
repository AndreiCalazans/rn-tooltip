//  @flow

import * as React from "react";
import {
  TouchableOpacity,
  Modal,
  View,
  ViewPropTypes as RNViewPropTypes
} from "react-native";
import PropTypes from "prop-types";

import Triangle from "./Triangle";
import { ScreenWidth, ScreenHeight, isIOS } from "./helpers";
import getTooltipCoordinate from "./getTooltipCoordinate";

const ViewPropTypes = RNViewPropTypes || View.propTypes;

type;
State = {
  isVisible: boolean,
  yOffset: number,
  xOffset: number,
  elementWidth: number,
  elementHeight: number
};

type;
Props = {
  withPointer: boolean,
  popover: React.Element,
  toggleOnPress: boolean,
  height: number | string,
  width: number | string,
  containerStyle: any,
  pointerColor: string,
  onClose: () => void,
  onOpen: () => void,
  withOverlay: boolean,
  overlayColor: string,
  backgroundColor: string,
  highlightColor: string,
  rtlSupport: boolean
};

class Tooltip extends React.Component<Props, State> {
  state = {
    isVisible: false,
    yOffset: 0,
    xOffset: 0,
    elementWidth: 0,
    elementHeight: 0
  };

  renderedElement;

  toggleTooltip = () => {
    const { onClose } = this.props;
    this.getElementPosition();
    this.setState(prevState => {
      if (prevState.isVisible && !isIOS) {
        onClose && onClose();
      }

      return { isVisible: !prevState.isVisible };
    });
  };

  wrapWithPress = (toggleOnPress, children) => {
    if (toggleOnPress) {
      return (
        <TouchableOpacity onPress={this.toggleTooltip} activeOpacity={1}>
          {children}
        </TouchableOpacity>
      );
    }

    return children;
  };

  getTooltipStyle = () => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const {
      height,
      backgroundColor,
      width,
      rtlSupport,
      withPointer,
      containerStyle
    } = this.props;

    const { x, y } = getTooltipCoordinate(
      xOffset,
      yOffset,
      elementWidth,
      elementHeight,
      ScreenWidth,
      ScreenHeight,
      width,
      height,
      withPointer
    );

    if (rtlSupport === true)
      return {
        position: "absolute",
        right: x,
        top: y,
        width,
        height,
        backgroundColor,
        // default styles
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: 10,
        padding: 10,
        ...containerStyle
      };
    else
      return {
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        backgroundColor,
        // default styles
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        borderRadius: 10,
        padding: 10,
        ...containerStyle
      };
  };

  renderPointer = tooltipY => {
    const { yOffset, xOffset, elementHeight, elementWidth } = this.state;
    const { backgroundColor, pointerColor, rtlSupport } = this.props;
    const pastMiddleLine = yOffset > tooltipY;

    return (
      <View
        style={[{
          position: "absolute",
          top: pastMiddleLine ? yOffset - 13 : yOffset + elementHeight - 2
        }, rtlSupport ? { right: xOffset + elementWidth / 2 - 7.5 } : { left: xOffset + elementWidth / 2 - 7.5 }]}
      >
        <Triangle
          style={{ borderBottomColor: pointerColor || backgroundColor }}
          isDown={pastMiddleLine}
        />
      </View>
    );
  };
  renderContent = withTooltip => {
    const { popover, withPointer, toggleOnPress, highlightColor, rtlSupport } = this.props;

    if (!withTooltip)
      return this.wrapWithPress(toggleOnPress, this.props.children);

    const { yOffset, xOffset, elementWidth, elementHeight } = this.state;
    const tooltipStyle = this.getTooltipStyle();
    return (
      <View>
        <View
          style={[{
            position: "absolute",
            top: yOffset,
            backgroundColor: highlightColor,
            overflow: "visible",
            width: elementWidth,
            height: elementHeight
          }, rtlSupport ? { right: xOffset } : { left: xOffset }]}
        >
          {this.props.children}
        </View>
        {withPointer && this.renderPointer(tooltipStyle.top)}
        <View style={tooltipStyle}>{popover}</View>
      </View>
    );
  };

  componentDidMount() {
    // wait to compute onLayout values.
    setTimeout(this.getElementPosition, 500);
  }

  getElementPosition = () => {
    this.renderedElement &&
    this.renderedElement.measureInWindow(
      (pageOffsetX, pageOffsetY, width, height) => {
        this.setState({
          xOffset: pageOffsetX,
          yOffset: pageOffsetY,
          elementWidth: width,
          elementHeight: height
        });
      }
    );
  };

  render() {
    const { isVisible } = this.state;
    const { onClose, withOverlay, onOpen, overlayColor } = this.props;

    return (
      <View collapsable={false} ref={e => (this.renderedElement = e)}>
        {this.renderContent(false)}
        <Modal
          animationType="fade"
          visible={isVisible}
          transparent
          onDismiss={onClose}
          onShow={onOpen}
          onRequestClose={onClose}
        >
          <TouchableOpacity
            style={styles.container(withOverlay, overlayColor)}
            onPress={this.toggleTooltip}
            activeOpacity={1}
          >
            {this.renderContent(true)}
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

Tooltip.propTypes = {
  children: PropTypes.element,
  withPointer: PropTypes.bool,
  popover: PropTypes.element,
  toggleOnPress: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  containerStyle: ViewPropTypes.style,
  pointerColor: PropTypes.string,
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  withOverlay: PropTypes.bool,
  overlayColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  highlightColor: PropTypes.string,
  rtlSupport: PropTypes.bool
};

Tooltip.defaultProps = {
  withOverlay: true,
  rtlSupport: false,
  highlightColor: "transparent",
  withPointer: true,
  toggleOnPress: true,
  height: 40,
  width: 150,
  containerStyle: {},
  backgroundColor: "#617080",
  onClose: () => {
  },
  onOpen: () => {
  }
};

const styles = {
  container: (withOverlay, overlayColor) => ({
    backgroundColor: withOverlay
      ? overlayColor
        ? overlayColor
        : "rgba(250, 250, 250, 0.70)"
      : "transparent",
    flex: 1
  })
};

export default Tooltip;
