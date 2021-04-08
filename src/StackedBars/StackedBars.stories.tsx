import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import StackedBarsComponent from './StackedBars';

export default {
  title: 'Charts',
} as Meta;

export const StackedBars: Story = () => <StackedBarsComponent />;
