import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import HorizontalBarStackChartComponent from './HorizontalBarStackChart';

export default {
  title: 'Charts',
} as Meta;

const HorizontalBarStackChartStory: Story = (args) => (
  <HorizontalBarStackChartComponent width={300} height={300} {...args} />
);

export const HorizontalBarStackChart = HorizontalBarStackChartStory.bind({});
