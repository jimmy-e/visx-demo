import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { CSF, Story, StoryTemplate } from 'storybook/StoryTemplate';
import StackedBarsComponent from './StackedBarsChart';

export default CSF('organisms');

export const StackedBars: Story = () => (
  <StoryTemplate title="Stacked Bars">
    <StackedBarsComponent />
  </StoryTemplate>
);
