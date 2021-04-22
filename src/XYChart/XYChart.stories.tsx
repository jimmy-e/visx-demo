import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import XYChartComponent from './XYChart';

export default {
  title: 'Charts',
  argTypes: {
    annotationKey: {
      control: {
        type: 'select',
        options: [null, 'Austin', 'New York', 'San Francisco'],
      },
    },
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
    orientation: {
      control: {
        type: 'radio',
        options: ['horizontal', 'vertical'],
      },
    },
    stackOffset: {
      control: {
        type: 'radio',
        options: ['diverging', 'expand', 'wiggle'],
      },
    },
    theme: {
      control: {
        type: 'radio',
        options: ['custom', 'dark', 'light'],
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
  annotationKey: null,
  annotationType: 'circle',
  barType: null,
  curveType: 'linear',
  editAnnotationLabelPosition: false,
  fewerDatum: false,
  glyphComponent: null,
  hasNegativeValues: false,
  hasSharedTooltip: true,
  isAnimated: true,
  lineType: 'areaStack',
  orientation: 'vertical',
  showGridColumns: false,
  showGridRows: false,
  showTooltip: true,
  showHorizontalCrosshair: false,
  showVerticalCrosshair: true,
  snapTooltipToDatumX: true,
  snapTooltipToDatumY: true,
  stackOffset: 'diverging',
  theme: 'light',
  xAxisOrientation: 'bottom',
  yAxisOrientation: 'left',
};
