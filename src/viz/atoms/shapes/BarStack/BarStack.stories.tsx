import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
import { getColorScale, getDateScale, getTemperatureScale } from 'organisms/StackedBars/getScales';
import { getDate, getKeys } from 'organisms/StackedBars/utils';
import config from 'src/config';
import BarStacksComponent, { Props } from 'molecules/BarStacks/BarStacks';

export default CSF('atoms/shapes');

const BarStackStory: Story<Props> = (args) => (
  <StoryTemplate title="Bar Stack">
    <svg height={config.dimensions.height} width={config.dimensions.width}>
      <BarStacksComponent {...args} />
    </svg>
  </StoryTemplate>
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
