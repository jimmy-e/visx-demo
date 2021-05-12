import React from 'react';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
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
  data: [cityTemperatures.data[0]],
  index: 'date',
};
