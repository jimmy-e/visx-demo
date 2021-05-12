import React from 'react';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Story, StorySection, StoryTemplate } from 'storybook/StoryTemplate';
import getDate from 'utils/accessors/getDate';
import BarStacksComponent, { Props } from './BarStacks';

export default CSF('molecules');

const height = 400;
const width = 400;

const defaultArgs: Props = {
  accessor: getDate,
  data: cityTemperatures.data,
  height,
  index: cityTemperatures.meta.index,
  width,
};

const expandArgs: Props = {
  ...defaultArgs,
  offset: 'expand',
}

export const BarStacks: Story = () => (
  <StoryTemplate title="Bar Stacks">
    <StorySection title="Default">
      <svg height={height} width={width}>
        <BarStacksComponent {...defaultArgs} />
      </svg>
    </StorySection>
    <StorySection title="Offset">
      <h1>Auto</h1>
      <svg height={height} width={width}>
        <BarStacksComponent {...defaultArgs} />
      </svg>
      <h1>Expand</h1>
      <svg height={height} width={width}>
        <BarStacksComponent {...expandArgs} />
      </svg>
    </StorySection>
  </StoryTemplate>
);
