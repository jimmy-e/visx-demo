import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import BarStackComponent, { Props } from './BarStack';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { getDate, getKeys } from 'organisms/StackedBars/utils';
import { getColorScale, getDateScale, getTemperatureScale } from 'organisms/StackedBars/getScales';

export default {
  title: 'molecules',
} as Meta;

const BarStackStory: Story<Props> = (args) => (
  <svg>
    <BarStackComponent {...args} />
  </svg>
);

export const BarStack = BarStackStory.bind({});
BarStack.args = {
  accessor: getDate,
  data: cityTemperatures,
  keys: getKeys(cityTemperatures),
  stackScale: getColorScale(cityTemperatures),
  xScale: getDateScale(cityTemperatures),
  yScale: getTemperatureScale(cityTemperatures),
};
