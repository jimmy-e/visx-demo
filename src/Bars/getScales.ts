import { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import dimensions from './dimensions';
import { ScaleBand, ScaleLinear } from './barsTypes';

// returns the x-axis scale band
export const getXScale = (data: LetterFrequency[]): ScaleBand<string> => scaleBand({
  range: [0, dimensions.xMax],
  round: true,
  domain: data.map((datum) => datum.letter),
  padding: 0.4,
});

// returns the y-axis scale linear
export const getYScale = (data: LetterFrequency[]): ScaleLinear<number> => scaleLinear({
  range: [dimensions.yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map((datum) => +datum.frequency * 100))],
});
