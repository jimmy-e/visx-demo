import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { getDate, getKeys } from 'organisms/StackedBars/utils';
import { getColorScale, getDateScale, getTemperatureScale } from 'organisms/StackedBars/getScales';
import config from 'src/config';
import BarStacksComponent, { Props } from 'molecules/BarStacks/BarStacks';

export default {
  title: 'atoms/shapes',
} as Meta;

const BarStackStory: Story<Props> = (args) => (
  <svg height={config.dimensions.height} width={config.dimensions.width}>
    <BarStacksComponent {...args} />
  </svg>
);

export const BarStack = BarStackStory.bind({});
BarStack.args = {
  accessor: getDate,
  data: [cityTemperatures[0]],
  keys: getKeys(cityTemperatures),
  stackScale: getColorScale(cityTemperatures),
  xScale: getDateScale(cityTemperatures),
  yScale: getTemperatureScale(cityTemperatures),
};
