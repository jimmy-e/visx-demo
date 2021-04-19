import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import XYChartComponent from './XYChart';

export default {
  title: 'Charts',
  argTypes: {
    annotationType: {
      control: {
        type: 'radio',
        options: ['circle', 'line'],
      },
    },
    curveType: {
      control: {
        type: 'radio',
        options: ['cardinal', 'linear', 'step'],
      },
    },
    stackOffset: {
      control: {
        type: 'radio',
        options: ['diverging', 'expand', 'wiggle'],
      },
    },
    xAxisOrientation: {
      control: {
        type: 'radio',
        options: ['bottom', 'top'],
      },
    },
    yAxisOrientation: {
      control: {
        type: 'radio',
        options: ['left', 'right'],
      },
    },
  },
} as Meta;

// ToDo: add prop binding
const XYChartStory: Story = (args) => <XYChartComponent {...args} />;

export const XYChart = XYChartStory.bind({});
XYChart.args = {
  annotationType: 'circle',
  curveType: 'linear',
  hasSharedTooltip: true,
  isAnimated: true,
  showGridColumns: false,
  showGridRows: false,
  showTooltip: true,
  showHorizontalCrosshair: false,
  showVerticalCrosshair: true,
  snapTooltipToDatumX: true,
  snapTooltipToDatumY: true,
  stackOffset: 'diverging',
  xAxisOrientation: 'bottom',
  yAxisOrientation: 'left',
};
