import React from 'react';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Example from './Example';
import ExampleControls from './ExampleControls';

interface Props {
  annotationKey?: 'Austin' | 'New York' | 'San Francisco';
  annotationType: 'circle' | 'line';
  barType?: 'default' | 'group' | 'stack';
  curveType: 'cardinal' | 'linear' | 'step';
  editAnnotationLabelPosition: boolean;
  glyphComponent?: 'circle' | 'cross' | 'star' | '🍍';
  hasFewerDatum: boolean;
  hasMissingValues: boolean;
  hasNegativeValues: boolean;
  hasSharedTooltip: boolean;
  isAnimated: boolean;
  lineType?: 'area' | 'areaStack' | 'default';
  orientation: 'horizontal' | 'vertical';
  showTooltip: boolean;
  showGridColumns: boolean;
  showGridRows: boolean;
  showHorizontalCrosshair: boolean;
  showVerticalCrosshair: boolean;
  snapTooltipToDatumX: boolean;
  snapTooltipToDatumY: boolean;
  stackOffset: 'diverging' | 'expand' | 'wiggle';
  theme: 'custom' | 'dark' | 'light';
  xAxisOrientation: 'bottom' | 'top';
  yAxisOrientation: 'left' | 'right';
}

const XYChart: React.FC<Props> = (props) => (
  <ParentSize>
    {
      ({ height, width }) => (
        <Example height={height} width={width} {...props} />
      )
    }
  </ParentSize>
);

export default XYChart;
