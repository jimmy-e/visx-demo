import React from 'react';
import { CityTemperature } from '@visx/mock-data/lib/mocks/cityTemperature';
import { GlyphProps } from '@visx/xychart/lib/types';
import { curveCardinal, curveLinear, curveStep } from '@visx/curve';

type Accessor = (datum: CityTemperature) => number | string;

interface KeyAccessors {
  'San Francisco': Accessor;
  'New York': Accessor;
  Austin: Accessor;
}

export type City = 'Austin' | 'New York' | 'San Francisco';

export type DataKey = keyof KeyAccessors;

export interface Accessors {
  x: KeyAccessors;
  y: KeyAccessors;
  date: Accessor;
}

export type ColorAccessorFactory = (key: DataKey) => (d: CityTemperature) => string | null;

export type Curve = typeof curveLinear | typeof curveCardinal | typeof curveStep;

export type Data = CityTemperature[];

export type RenderGlyph = React.FC<GlyphProps<CityTemperature>>;
