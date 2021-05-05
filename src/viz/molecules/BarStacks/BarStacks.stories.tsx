import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
import { getDate, getKeys } from 'organisms/StackedBars/utils';
import { getColorScale, getDateScale, getTemperatureScale } from 'organisms/StackedBars/getScales';
import config from 'src/config';
import BarStacksComponent, { Props } from './BarStacks';

export default CSF('molecules');

const BarStacksStory: Story<Props> = (args) => (
  <StoryTemplate title="Bar Stacks">
    <svg height={config.dimensions.height} width={config.dimensions.width}>
      <BarStacksComponent {...args} />
    </svg>
  </StoryTemplate>
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
