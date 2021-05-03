import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import FooComponent from './Foo';

export default {
  title: 'Charts',
} as Meta;

const FooStory: Story = (args) => (
  <div style={{ width: '50rem', height: '50rem' }}>
    <FooComponent {...args} />
  </div>
);

export const FooChart = FooStory.bind({});
