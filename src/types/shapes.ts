import { BarGroupBar, SeriesPoint } from '@visx/shape/lib/types';
import { BarStack } from '@visx/shape/lib/types/barStack';
import { Datum } from './data';

export type BarShape = Omit<BarGroupBar<string>, 'key' | 'value'> & { bar: SeriesPoint<Datum>; key: string };
export type BarStackShape = BarStack<Datum, string>;
