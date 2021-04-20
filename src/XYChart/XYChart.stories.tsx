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
    barType: {
      control: {
        type: 'select',
        options: [null, 'default', 'group', 'stack'],
      },
    },
    curveType: {
      control: {
        type: 'radio',
        options: ['cardinal', 'linear', 'step'],
      },
    },
    glyphComponent: {
      control: {
        type: 'select',
        options: [null, 'circle', 'cross', 'star', '🍍'],
      },
    },
    lineType: {
      control: {
        type: 'select',
        options: [null, 'area', 'areaStack', 'default'],
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
  barType: null,
  curveType: 'linear',
  editAnnotationLabelPosition: false,
  glyphComponent: null,
  hasSharedTooltip: true,
  isAnimated: true,
  lineType: 'areaStack',
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
