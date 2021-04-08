import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { SeriesPoint } from '@visx/shape/lib/types';

export type ColorScale = import('d3-scale').ScaleOrdinal<CityName, string, never>;

export type CityName = 'New York' | 'San Francisco' | 'Austin';

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
