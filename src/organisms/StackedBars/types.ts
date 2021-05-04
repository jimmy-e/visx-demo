import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { SeriesPoint } from '@visx/shape/lib/types';

export type ScaleBand<Input> = import('d3-scale').ScaleBand<Input>;
export type ScaleLinear<Output> = import('d3-scale').ScaleLinear<Output, Output, never>;
export type ScaleOrdinal<Input, Output> = import('d3-scale').ScaleOrdinal<Input, Output, never>;

export type ColorScale = ScaleOrdinal<string, string>;
export type DateScale = ScaleBand<string>;
export type Keys = string[];
export type TemperatureScale = ScaleLinear<number>;

export type TooltipData = {
  bar: SeriesPoint<CityTemperature>;
  key: string;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};
