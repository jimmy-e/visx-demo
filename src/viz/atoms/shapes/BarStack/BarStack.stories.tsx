import React from 'react';
import cityTemperatures from '__fixtures__/cityTemperatures';
import { CSF, StoryTemplate } from 'storybook/StoryTemplate';
import BarStacksComponent, { Props } from 'molecules/BarStacks/BarStacks';

export default CSF('atoms/shapes');

const defaultArgs: Props = {
  height: 400,
  payload: {
    ...cityTemperatures,
    data: [cityTemperatures.data[0]],
  },
  width: 400,
}

export const BarStack = () => (
  <StoryTemplate title="Bar Stack">
    <svg height={400} width={400}>
      <BarStacksComponent {...defaultArgs} />
    </svg>
  </StoryTemplate>
);
