import React from 'react';
import { ParentSize } from '@visx/responsive';
import cityTemperatures from '__fixtures__/cityTemperatures';
import streamEnrichment from '__fixtures__/streamEnrichment';
import { CSF, Resizable, Story, StoryBlock, StorySection, StoryTemplate } from 'storybook/StoryTemplate';
import BarStacksComponent from './BarStacksChart';

export default CSF('organisms');

export const BarStacksChart: Story = () => (
  <StoryTemplate title="Bar Stacks Chart">
    <StorySection title="Default">
      <StoryBlock>
        <ParentSize>
          {
            ({height, width}) => (
              <BarStacksComponent
                height={height}
                // payload={cityTemperatures}
                payload={streamEnrichment}
                width={width}
              />
            )
          }
        </ParentSize>
      </StoryBlock>
    </StorySection>
    <StorySection title="Resizable">
      <Resizable>
        <ParentSize>
          {
            ({height, width}) => (
              <BarStacksComponent
                height={height}
                payload={cityTemperatures}
                width={width}
              />
            )
          }
        </ParentSize>
      </Resizable>
    </StorySection>
  </StoryTemplate>
);
