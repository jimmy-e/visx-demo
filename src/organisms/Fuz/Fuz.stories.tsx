import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import FuzComponent from './Fuz';

export default {
  title: 'Charts',
} as Meta;

const FuzStory: Story = (args) => (
  <div style={{ width: '50rem', height: '50rem' }}>
    <FuzComponent {...args} />
  </div>
);

export const FuzChart = FuzStory.bind({});
