//  @flow

import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// type Props = {
//   style: any,
//   isDown: boolean,
// };

const Triangle = ({ style, isDown }) => (
  <View style={[styles.triangle, style, isDown ? styles.down : {}]} />
);
Triangle.propTypes = {
  isDown: PropTypes.bool,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  down: {
    transform: [{ rotate: '180deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
});

export default Triangle;
