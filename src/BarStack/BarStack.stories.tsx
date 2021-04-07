import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import BarStackComponent from './BarStack';

export default {
  title: 'Charts',
} as Meta;

export const BarStack: Story = () => <BarStackComponent />;
