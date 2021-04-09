import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';
import ExampleControls from './ExampleControls';

const XYChart: React.FC = () => (
  <ParentSize>
    {
      ({ height, width }) => (
        <ExampleControls>
          {(props) => (
            <Example height={height} width={width} {...props} />
          )}
        </ExampleControls>
      )
    }
  </ParentSize>
);

export default XYChart;
