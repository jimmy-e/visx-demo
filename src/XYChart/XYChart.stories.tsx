import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import XYChartComponent from './XYChart';

export default {
  title: 'Charts',
} as Meta;

// ToDo: add prop binding
const XYChartStory: Story = (args) => <XYChartComponent {...args} />;

export const XYChart = XYChartStory.bind({});
XYChart.args = {
  hasSharedTooltip: true,
  isAnimated: true,
  showGridColumns: false,
  showGridRows: false,
  showTooltip: true,
  showHorizontalCrosshair: false,
  showVerticalCrosshair: true,
};
