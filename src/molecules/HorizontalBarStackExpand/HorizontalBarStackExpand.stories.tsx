import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import HorizontalBarStackExpandComponent, { Props } from './HorizontalBarStackExpand';
import cityTemperatures from '__fixtures__/cityTemperatures';

export default {
  title: 'molecules',
} as Meta;

const HorizontalBarStackExpandStory: Story<Props> = (args) => (
  <div style={{ width: '50rem', height: '50rem' }}>
    <HorizontalBarStackExpandComponent {...args} />
  </div>
);

export const HorizontalBarStackExpand = HorizontalBarStackExpandStory.bind({});
HorizontalBarStackExpand.args = {
  data: cityTemperatures,
};

export const SingleHorizontalBarStackExpand = HorizontalBarStackExpandStory.bind({});
SingleHorizontalBarStackExpand.args = {
  data: [cityTemperatures[0]],
};
