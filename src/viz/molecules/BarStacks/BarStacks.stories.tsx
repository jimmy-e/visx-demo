import React from 'react';
import streamEnrichment from '__fixtures__/streamEnrichment';
import { CSF, Story, StorySection, StoryTemplate } from 'storybook/StoryTemplate';
import BarStacksComponent, { Props } from './BarStacks';

export default CSF('molecules');

const height = 400;
const width = 400;

const defaultArgs: Props = {
  height,
  payload: streamEnrichment,
  width,
};

const expandArgs: Props = {
  ...defaultArgs,
  payload: {
    ...streamEnrichment,
    meta: {
      ...streamEnrichment.meta,
      shape: {
        ...streamEnrichment.meta.shape,
        offset: 'expand',
      },
    },
  },
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
