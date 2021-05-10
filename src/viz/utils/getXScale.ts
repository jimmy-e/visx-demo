import { scaleBand } from '@visx/scale';
import { BandScale, Config, Data } from 'src/types';
import getValue from './getValue';

export default (
  data: Data,
  index: string,
  xMax: Config['dimensions']['xMax'],
): BandScale => {
  const xScale = scaleBand<string>({
    domain: data.map((datum) => getValue(datum, index)),
    padding: 0.2,
  });

  xScale.rangeRound([0, xMax]);

  return xScale;
}
