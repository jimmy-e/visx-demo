import { scaleOrdinal } from '@visx/scale';
import { Config, Data, Keys, OrdinalScale } from 'src/types';

export default (colors: Config['theme']['colors'], data: Data, keys: Keys): OrdinalScale => (
  scaleOrdinal<string, string>({
    domain: keys,
    range: [colors.colorOne, colors.colorTwo, colors.colorThree],
  })
);
