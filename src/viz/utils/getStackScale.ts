import { scaleOrdinal } from '@visx/scale';
import { Config, Data, Keys, OrdinalScale } from 'src/types';

export default (colors: Config['theme']['colors'], data: Data, keys: Keys): OrdinalScale => {
  const { colorOne, colorTwo, colorThree } = colors;

  return scaleOrdinal<string, string>({
    domain: keys,
    range: [colorOne, colorTwo, colorThree],
  });
};
