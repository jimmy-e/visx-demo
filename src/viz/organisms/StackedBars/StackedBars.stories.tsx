import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { StoryTemplate } from 'storybook/StoryTemplate';
import StackedBarsComponent from './StackedBarsChart';

export default {
  title: 'Organisms',
} as Meta;

export const StackedBars: Story = () => (
  <StoryTemplate title="Stacked Bars">
    <StackedBarsComponent />
  </StoryTemplate>
);
