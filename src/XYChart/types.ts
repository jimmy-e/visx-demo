import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { CurveFactory } from 'd3-shape';
import { XYChartTheme } from '@visx/xychart';
import { CityTemperature, Data } from 'src/types';

export interface XYChartProps {
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
  themeType: 'custom' | 'dark' | 'light';
  xAxisOrientation: 'bottom' | 'top';
  yAxisOrientation: 'left' | 'right';
}

export interface XYChartConfig {
  animationTrajectory: AnimationTrajectory;
  curve: CurveFactory;
  data: Data;
  render: {
    areaSeries: boolean;
    areaStack: boolean;
    barGroup: boolean;
    barSeries: boolean;
    barStack: boolean;
    lineSeries: boolean;
  },
  renderHorizontally: boolean;
  theme: XYChartTheme;
}
