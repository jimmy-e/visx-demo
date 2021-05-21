import { scaleLinear } from '@visx/scale';
import { Payload, LinearScale } from 'src/types';

export default (payload: Payload, yMax: number): LinearScale => {
  let yScale: LinearScale;

  if (payload.meta.shape.offset === 'expand') {
    yScale = scaleLinear<number>({
      domain: [0, 1],
      nice: true,
    });
  } else {
    const keys = payload.meta.keys.allIds;

    // ToDo: I could probably come up with better parameter names
    const values = payload.data.reduce((totals, item) => {
      const total = keys.reduce((keyTotal, index) => {
        keyTotal += Number(item[index]);
        return keyTotal;
      }, 0);
      totals.push(total);
      return totals;
    }, [] as number[]);

    yScale = scaleLinear<number>({
      domain: [0, Math.max(...values)],
      nice: true,
    });
  }

  yScale.range([yMax, 0]);

  return yScale;
};
