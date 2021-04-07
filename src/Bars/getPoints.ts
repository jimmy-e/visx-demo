import { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { scaleBand, scaleLinear } from '@visx/scale';
import dimensions from './dimensions';
import { Accessor, Scale, XScale, YScale } from './barsTypes';

// ----- GET SCALES ----- //

// returns the x-axis band scale
const getXScale = (data: LetterFrequency[], accessor: Accessor): XScale => scaleBand({
  range: [0, dimensions.xMax],
  round: true,
  domain: data.map(accessor),
  padding: 0.4,
});

// returns the y-axis linear scale
const getYScale = (data: LetterFrequency[], accessor: Accessor): YScale => scaleLinear({
  range: [dimensions.yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(accessor))],
});

// ----- GET POINTS ----- //

const compose = (scale: Scale, accessor: Accessor) => (data: LetterFrequency[]) => scale(accessor(data));

export default (data: LetterFrequency[], xAccessor: Accessor, yAccessor: Accessor) => {
  const xScale = getXScale(data, xAccessor);
  const yScale = getYScale(data, yAccessor);

  const xPoint = compose(xScale, xAccessor);
  const yPoint = compose(yScale, yAccessor);

  return {
    xPoint,
    yPoint,
    bandWidth: xScale.bandwidth(),
  }
};
