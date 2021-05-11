import React from 'react';
import { ParentSize } from '@visx/responsive';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Resizable, Story, StoryTemplate } from 'storybook/StoryTemplate';
import BarStacksComponent from './BarStacksChart';

export default CSF('organisms');

export const BarStacksChart: Story = () => (
  <StoryTemplate title="Bar Stacks Chart">
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
  </StoryTemplate>
);
