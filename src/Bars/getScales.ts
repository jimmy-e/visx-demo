import { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import config from './config';
import { Accessor, XScale, YScale } from './types';

// returns the x-axis band scale
export const getXScale = (data: LetterFrequency[], accessor: Accessor): XScale => scaleBand({
  range: [0, config.dimensions.xMax],
  round: true,
  domain: data.map(accessor),
  padding: 0.4,
});

// returns the y-axis linear scale
export const getYScale = (data: LetterFrequency[], accessor: Accessor): YScale => scaleLinear({
  range: [config.dimensions.yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(accessor))],
});
