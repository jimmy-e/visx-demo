import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';
import ExampleControls from './ExampleControls';

interface Props {
  annotationType: 'circle' | 'line';
  curveType: 'cardinal' | 'linear' | 'step';
  editAnnotationLabelPosition: boolean;
  hasSharedTooltip: boolean;
  glyphComponent?: 'circle' | 'cross' | 'star' | '🍍';
  isAnimated: boolean;
  showTooltip: boolean;
  showGridColumns: boolean;
  showGridRows: boolean;
  showHorizontalCrosshair: boolean;
  showVerticalCrosshair: boolean;
  snapTooltipToDatumX: boolean;
  snapTooltipToDatumY: boolean;
  stackOffset: 'diverging' | 'expand' | 'wiggle';
  xAxisOrientation: 'bottom' | 'top';
  yAxisOrientation: 'left' | 'right';
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
