import { AnimationTrajectory } from '@visx/react-spring/lib/types';
import { CurveFactory } from 'd3-shape';
import { XYChartTheme } from '@visx/xychart';

import { Dispatch, SetStateAction } from 'react';
import { curveCardinal, curveLinear, curveStep } from '@visx/curve';

export type Accessor = (datum: Datum) => number | string;

export interface Accessors {
  x: KeyAccessors;
  y: KeyAccessors;
  date: Accessor;
}

export type City = 'Austin' | 'New York' | 'San Francisco';

export type ColorAccessorFactory = (dataKey: DataKey) => (datum: Datum) => string | null;

export type Curve = typeof curveLinear | typeof curveCardinal | typeof curveStep;

export type Data = Datum[];

export type DataKey = keyof KeyAccessors;

export interface Datum {
  [key: string]: number | string;
}

export type IsAnimated = boolean;

export interface KeyAccessors {
  [key: string]: Accessor;
}

export type Offset = 'diverging' | 'expand' | 'wiggle';

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface XYChartProps {
  annotationKey?: 'Austin' | 'New York' | 'San Francisco';
  annotationType: 'circle' | 'line';
  barType?: 'default' | 'group' | 'stack';
  curveType: 'cardinal' | 'linear' | 'step';
  data: Data;
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
