import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import StackedBarsChartComponent from './StackedBarsChart';

export default {
  title: 'Old',
} as Meta;

export const StackedBarsExpandChart: Story = () => <StackedBarsChartComponent />;
