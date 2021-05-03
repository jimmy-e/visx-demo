import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import HorizontalBarStackExpandComponent from './HorizontalBarStackExpand';
import cityTemperatures from '__fixtures__/cityTemperatures';

export default {
  title: 'Charts',
} as Meta;

const HorizontalBarStackExpandStory: Story = (args) => (
  <div style={{ width: '50rem', height: '50rem' }}>
    <HorizontalBarStackExpandComponent data={cityTemperatures} {...args} />
  </div>
);

export const HorizontalBarStackExpandChart = HorizontalBarStackExpandStory.bind({});
