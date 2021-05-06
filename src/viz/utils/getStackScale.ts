import { scaleOrdinal } from '@visx/scale';
import { Config, Data, Keys, OrdinalScale } from 'src/types';

export default (colors: Config['theme']['colors'], data: Data, keys: Keys): OrdinalScale => {
  const { purple1, purple2, purple3 } = colors;

  return scaleOrdinal<string, string>({
    domain: keys,
    range: [purple1, purple2, purple3],
  });
};
