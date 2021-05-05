import { SeriesPoint } from '@visx/shape/lib/types';
import { Datum } from './data';

export type TooltipData = {
  bar: SeriesPoint<Datum>;
  color: string;
  height: number;
  index: number;
  key: string;
  width: number;
  x: number;
  y: number;
};
