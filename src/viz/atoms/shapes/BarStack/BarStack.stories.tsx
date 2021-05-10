import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
import { getDate } from 'organisms/BarStacksChart/utils';
import BarStacksComponent, { Props } from 'molecules/BarStacks/BarStacks';

export default CSF('atoms/shapes');

const BarStackStory: Story<Props> = (args) => (
  <StoryTemplate title="Bar Stack">
    <svg height={400} width={400}>
      <BarStacksComponent {...args} />
    </svg>
  </StoryTemplate>
);

export const BarStack = BarStackStory.bind({});
BarStack.args = {
  accessor: getDate,
  data: [cityTemperatures[0]],
  index: 'date',
};
