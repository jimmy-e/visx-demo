import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
import BarStacksComponent from './BarStacksChart';

export default CSF('organisms');

export const BarStacksChart: Story = () => (
  <StoryTemplate title="Bar Stacks Chart">
    <BarStacksComponent />
  </StoryTemplate>
);
