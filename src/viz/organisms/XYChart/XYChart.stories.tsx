import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
import XYChartComponent from './XYChart';
import { XYChartProps } from './types';
import cityTemperatures from '__fixtures__/cityTemperatures';

export default CSF(
  'organisms',
  {
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
      themeType: {
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
  }
);

const XYChartStory: Story<XYChartProps> = (args) => (
  <StoryTemplate title="XY Chart">
    <XYChartComponent {...args} />
  </StoryTemplate>
);

export const XYChart = XYChartStory.bind({});
XYChart.args = {
  annotationKey: undefined,
  annotationType: 'circle',
  barType: undefined,
  curveType: 'linear',
  data: cityTemperatures,
  editAnnotationLabelPosition: false,
  glyphComponent: undefined,
  hasFewerDatum: false,
  hasMissingValues: false,
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
  themeType: 'light',
  xAxisOrientation: 'bottom',
  yAxisOrientation: 'left',
};
