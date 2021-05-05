import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import HorizontalBarStackFullComponent, { Props } from './HorizontalBarStackFull';
import cityTemperatures from '__fixtures__/cityTemperatures';

export default {
  title: 'molecules',
} as Meta;

const HorizontalBarStackFullStory: Story<Props> = (args) => (
  <div style={{ width: '50rem', height: '50rem' }}>
    <HorizontalBarStackFullComponent {...args} />
  </div>
);

export const HorizontalBarStackFull = HorizontalBarStackFullStory.bind({});
HorizontalBarStackFull.args = {
  data: cityTemperatures,
};

export const SingleHorizontalBarStackFull = HorizontalBarStackFullStory.bind({});
SingleHorizontalBarStackFull.args = {
  data: [cityTemperatures[0]],
};
