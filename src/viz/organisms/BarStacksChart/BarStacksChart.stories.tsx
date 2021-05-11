import React from 'react';
import { ParentSize } from '@visx/responsive';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Resizable, Story, StorySection, StoryTemplate } from 'storybook/StoryTemplate';
import BarStacksComponent from './BarStacksChart';

export default CSF('organisms');

export const BarStacksChart: Story = () => (
  <StoryTemplate title="Bar Stacks Chart">
    <StorySection title="Default">
      <div style={{ height: '400px', width: '400px' }}>
        <ParentSize>
          {
            ({height, width}) => (
              <BarStacksComponent
                data={cityTemperatures}
                height={height}
                index="date"
                width={width}
              />
            )
          }
        </ParentSize>
      </div>
    </StorySection>
    <StorySection title="Resizable">
      <Resizable>
        <ParentSize>
          {
            ({height, width}) => (
              <BarStacksComponent
                data={cityTemperatures}
                height={height}
                index="date"
                width={width}
              />
            )
          }
        </ParentSize>
      </Resizable>
    </StorySection>
  </StoryTemplate>
);
