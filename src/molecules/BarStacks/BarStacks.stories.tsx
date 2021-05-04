import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { getDate, getKeys } from 'organisms/StackedBars/utils';
import { getColorScale, getDateScale, getTemperatureScale } from 'organisms/StackedBars/getScales';
import config from 'organisms/StackedBars/config';
import BarStacksComponent, { Props } from './BarStacks';

export default {
  title: 'molecules',
} as Meta;

const BarStacksStory: Story<Props> = (args) => (
  <svg height={config.dimensions.height} width={config.dimensions.width}>
    <BarStacksComponent {...args} />
  </svg>
);

export const BarStacks = BarStacksStory.bind({});
BarStacks.args = {
  accessor: getDate,
  data: cityTemperatures,
  keys: getKeys(cityTemperatures),
  stackScale: getColorScale(cityTemperatures),
  xScale: getDateScale(cityTemperatures),
  yScale: getTemperatureScale(cityTemperatures),
};