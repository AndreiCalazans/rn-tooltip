import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Tooltip from 'rn-tooltip';

class App extends React.Component {
  tooltip;

  handlePress = () => {
    this.tooltip.toggleTooltip();
  };

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
          padding: 20,
        }}
      >
        <View
          style={{ width: '100%' }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Tooltip withPointer={false} tooltipText="no caret!">
            <Text>without caret</Text>
          </Tooltip>
          <Tooltip tooltipWidth={200} tooltipText="Tooltip info goes here">
            <Text>Press me</Text>
          </Tooltip>
        </View>

        <View
          style={{ width: '100%' }}
          flexDirection="row"
          justifyContent="space-between"
        >
          <Tooltip tooltipWidth={200} tooltipText="Tooltip info goes here">
            <Text>Press me</Text>
          </Tooltip>
          <Tooltip
            tooltipWidth={300}
            tooltipHeight={150}
            tooltipText="Some big text full of important stuff ment for the super duper user that our design carefully created for us just becuase he super likes me and you and all the world bro, congratulations for reading until now"
            hightlightColor="lightgray"
          >
            <Text>HUGE</Text>
          </Tooltip>
        </View>

        <Tooltip
          tooltipText="Tooltip info goes here"
          tooltipWidth={200}
          hightlightColor="lightgreen"
        >
          <Text>More attention</Text>
        </Tooltip>

        <View
          style={{ width: '100%' }}
          flexDirection="row"
          justifyContent="space-around"
        >
          <Tooltip
            backgroundColor="lightpink"
            tooltipText="Tooltip info goes here"
            tooltipWidth={200}
          >
            <Text>I am different</Text>
          </Tooltip>
          <Tooltip tooltipText="Tooltip info goes here" tooltipWidth={200}>
            <Text>Press me</Text>
          </Tooltip>
        </View>
      </ScrollView>
    );
  }
}

export default App;
