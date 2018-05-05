
### rn-tooltip

*Simple, lightwweight and **blazing fast** react native tooltip*


<img src="./tooltipExample.gif" width='250' />


### Install

`yarn add rn-tooltip`

or

`npm install rn-tooltip --save`



### Usage

```javascript
<Tooltip tooltipWidth={200} tooltipText="Tooltip info goes here">
  <Text>Press me</Text>
</Tooltip>
```

*Check the code inside the [example app](./TooltipExample/App.js)*


### Props
```javascript

type Props = {
  children: React.Element,
  withPointer: boolean, // default true
  tooltipText?: string,

  tooltipComponent?: React.Element, // tooltipComponent substitutes the Text inside View for what ever
  //you pass here. 

  toggleOnPress: boolean, // open tooltip if you press element. Defaut is false
  tooltipHeight: number, // necessary to calculate positioning.
  tooltipWidth: number, // necessary to calculate positioning.
  tooltipContainerStyle?: any,
  pointerColor?: string,
  tooltipTextStyle?: any,
  onClose?: () => any,
  withOverlay?: boolean, // default true.
  backgroundColor?: string,
  hightlightColor?: string,
  tooltipContainerDefaultStyle?: any,
};
```


**MIT Licensed**