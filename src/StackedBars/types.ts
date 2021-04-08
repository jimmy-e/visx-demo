import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { SeriesPoint } from '@visx/shape/lib/types';
import { ScaleBand, ScaleLinear, ScaleOrdinal } from '../types';

export type CityName = 'New York' | 'San Francisco' | 'Austin';
export type ColorScale = ScaleOrdinal<CityName, string>;
export type DateScale = ScaleBand<string>;
export type Keys = CityName[];
export type TemperatureScale = ScaleLinear<number>;

export type TooltipData = {
  bar: SeriesPoint<CityTemperature>;
  key: CityName;
  index: number;
  height: number;
  width: number;
  x: number;
  y: number;
  color: string;
};
