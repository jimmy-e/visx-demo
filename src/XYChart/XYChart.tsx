import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';
import ExampleControls from './ExampleControls';

interface Props {
  isAnimated: boolean;
  showTooltip: boolean;
  showHorizontalCrosshair: boolean;
  showVerticalCrosshair: boolean;
}

const XYChart: React.FC<Props> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <ExampleControls height={height} width={width}>
          {(controlProps) => (
            <Example {...controlProps} {...props} />
          )}
        </ExampleControls>
      )
    }
  </ParentSize>
);

export default XYChart;
