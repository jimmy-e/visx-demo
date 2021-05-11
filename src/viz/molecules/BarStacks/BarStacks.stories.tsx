import React from 'react';
import { ParentSize } from '@visx/responsive';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, Resizable, Story, StorySection, StoryTemplate } from 'storybook/StoryTemplate';
import { getDate } from 'organisms/BarStacksChart/utils';
import BarStacksComponent, { Props } from './BarStacks';

export default CSF('molecules');

const defaultArgs: Props = {
  accessor: getDate,
  data: cityTemperatures,
  // height,
  index: 'date',
  // width,
};

const expandArgs: Props = {
  ...defaultArgs,
  offset: 'expand',
}

export const BarStacks: Story = () => (
  <StoryTemplate title="Bar Stacks">
    <StorySection title="Default">
      <Resizable>
        <ParentSize>
          {
            ({ height, width }) => (
              <svg height={height} width={width}>
                <BarStacksComponent {...defaultArgs} height={height} width={width} />
              </svg>
            )
          }
        </ParentSize>
      </Resizable>
    </StorySection>
    {/*<StorySection title="Offset">*/}
    {/*  <h1>Auto</h1>*/}
    {/*  <svg height={height} width={width}>*/}
    {/*    <BarStacksComponent {...defaultArgs} />*/}
    {/*  </svg>*/}
    {/*  <h1>Expand</h1>*/}
    {/*  <svg height={height} width={width}>*/}
    {/*    <BarStacksComponent {...expandArgs} />*/}
    {/*  </svg>*/}
    {/*</StorySection>*/}
  </StoryTemplate>
);
