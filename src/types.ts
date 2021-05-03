import { Dispatch, SetStateAction } from 'react';
import { curveCardinal, curveLinear, curveStep } from '@visx/curve';

type Accessor = (datum: Datum) => number | string;

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

export interface KeyAccessors {
  [key: string]: Accessor;
}

export type SetState<T> = Dispatch<SetStateAction<T>>;
