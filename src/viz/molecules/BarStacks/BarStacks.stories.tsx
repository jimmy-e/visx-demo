import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
import { getDate } from 'organisms/BarStacksChart/utils';
import { getColorScale, getDateScale, getTemperatureScale } from 'organisms/BarStacksChart/getScales';
import BarStacksComponent, { Props } from './BarStacks';

export default CSF('molecules');

const BarStacksStory: Story<Props> = (args) => (
  <StoryTemplate title="Bar Stacks">
    <svg height={400} width={400}>
      <BarStacksComponent {...args} />
    </svg>
  </StoryTemplate>
);

export const BarStacks = BarStacksStory.bind({});
BarStacks.args = {
  accessor: getDate,
  data: cityTemperatures,
  index: 'date',
  stackScale: getColorScale(cityTemperatures),
  xScale: getDateScale(cityTemperatures),
  yScale: getTemperatureScale(cityTemperatures),
};
