import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import TestRenderer from 'react-test-renderer';
import Tooltip from '../src/Tooltip';
import Triangle from '../src/Triangle';

describe('Tooltip component', () => {
  it('should render without issues', () => {
    const component = TestRenderer.create(
      <Tooltip popover={<Text>Info here</Text>}>
        <Text>Press me</Text>
      </Tooltip>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should display tooltip when no actionType is provided (will default to onPress)', () => {
    const Info = () => <Text>Info here</Text>;
    const component = TestRenderer.create(
      <Tooltip height={100} width={200} popover={<Info />}>
        <Text>Press me</Text>
      </Tooltip>,
    );

    component.root.findAllByType(TouchableOpacity)[0].props.onPress();
    expect(component.root.findByType(Triangle)).toBeTruthy();
    expect(component.root.findByType(Info)).toBeTruthy();

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should display tooltip on longPress', () => {
    const Info = () => <Text>Info here</Text>;
    const component = TestRenderer.create(
      <Tooltip
        height={100}
        width={200}
        popover={<Info />}
        actionType="longPress"
      >
        <Text>Press me</Text>
      </Tooltip>,
    );

    component.root.findAllByType(TouchableOpacity)[0].props.onLongPress();
    expect(component.root.findByType(Triangle)).toBeTruthy();
    expect(component.root.findByType(Info)).toBeTruthy();

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('does not render pointer', () => {
    const component = TestRenderer.create(
      <Tooltip
        withPointer={false}
        height={100}
        width={200}
        popover={<Text>Info here</Text>}
      >
        <Text>Press me</Text>
      </Tooltip>,
    ).root;

    component.findAllByType(TouchableOpacity)[0].props.onPress();
    expect(component.instance.state.isVisible).toBe(true);
    try {
      component.findByType(Triangle);
    } catch (e) {
      expect(e.message).toBe('No instances found with node type: "Triangle"');
    }
  });

  it('does not render pointer when actionType is longPress', () => {
    const component = TestRenderer.create(
      <Tooltip
        withPointer={false}
        height={100}
        width={200}
        actionType="longPress"
        popover={<Text>Info here</Text>}
      >
        <Text>Press me</Text>
      </Tooltip>,
    ).root;

    component.findAllByType(TouchableOpacity)[0].props.onLongPress();
    expect(component.instance.state.isVisible).toBe(true);
    try {
      component.findByType(Triangle);
    } catch (e) {
      expect(e.message).toBe('No instances found with node type: "Triangle"');
    }
  });
});
