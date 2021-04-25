import React, { Dispatch, SetStateAction } from 'react';
import { CityTemperature as VisxCityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphProps } from '@visx/xychart/lib/types';
import { curveCardinal, curveLinear, curveStep } from '@visx/curve';

type Accessor = (datum: CityTemperature) => number | string;

export interface Accessors {
  x: KeyAccessors;
  y: KeyAccessors;
  date: Accessor;
}

export type City = 'Austin' | 'New York' | 'San Francisco';

export type CityTemperature = VisxCityTemperature;

export type ColorAccessorFactory = (dataKey: DataKey) => (datum: CityTemperature) => string | null;

export type Curve = typeof curveLinear | typeof curveCardinal | typeof curveStep;

export type Data = CityTemperature[];

export type DataKey = keyof KeyAccessors;

interface KeyAccessors {
  'San Francisco': Accessor;
  'New York': Accessor;
  Austin: Accessor;
}

export type RenderGlyph = React.FC<GlyphProps<CityTemperature>>;

export type SetState<T> = Dispatch<SetStateAction<T>>;
