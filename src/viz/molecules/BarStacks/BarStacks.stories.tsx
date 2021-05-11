import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Story, StorySection, StoryTemplate } from 'storybook/StoryTemplate';
import { getDate } from 'organisms/BarStacksChart/utils';
import BarStacksComponent, { Props } from './BarStacks';

export default CSF('molecules');

const defaultArgs: Props = {
  accessor: getDate,
  data: cityTemperatures,
  index: 'date',
};

const expandArgs: Props = {
  ...defaultArgs,
  offset: 'expand',
}

export const BarStacks: Story = () => (
  <StoryTemplate title="Bar Stacks">
    <StorySection title="Default">
      <svg height={400} width={400}>
        <BarStacksComponent {...defaultArgs} />
      </svg>
    </StorySection>
    <StorySection title="Offset">
      <h1>Auto</h1>
      <svg height={400} width={400}>
        <BarStacksComponent {...defaultArgs} />
      </svg>
      <h1>Expand</h1>
      <svg height={400} width={400}>
        <BarStacksComponent {...expandArgs} />
      </svg>
    </StorySection>
  </StoryTemplate>
);
