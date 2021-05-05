import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { BarStack } from '@visx/shape/lib/types/barStack';

// ----- ACCESSORS ----- //

export type Accessor = (datum: Datum) => number | string;

// ----- DATA ----- //

export type Data = Datum[];

export interface Datum {
  [key: string]: number | string;
}

export type Keys = string[];

// ----- TOOLTIP ----- //

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

// ----- SCALES ----- //

type ScaleBand<Input> = import('d3-scale').ScaleBand<Input>;
type ScaleLinear<Output> = import('d3-scale').ScaleLinear<Output, Output, never>;
type ScaleOrdinal<Input, Output> = import('d3-scale').ScaleOrdinal<Input, Output, never>;

export type BandScale = ScaleBand<string>;
export type OrdinalScale = ScaleOrdinal<string, string>;
export type LinearScale = ScaleLinear<number>;

// ----- SHAPES ----- //

export type BarShape = Omit<BarGroupBar<string>, 'key' | 'value'> & { bar: SeriesPoint<Datum>; key: string };
export type BarStackShape = BarStack<Datum, string>;
