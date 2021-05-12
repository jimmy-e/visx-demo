import { scaleOrdinal } from '@visx/scale';
import { Config, Data, OrdinalScale } from 'src/types';
import getKeys from 'utils/keys/getKeys';

interface Props {
  colors: Config['theme']['colors']['barStacks'];
  data: Data;
  index: string;
}

export default ({ colors, data, index }: Props): OrdinalScale => {
  const { colorOne, colorTwo } = colors;
  const keys = getKeys(data, index);

  return scaleOrdinal<string, string>({
    domain: keys,
    range: [colorOne, colorTwo],
  });
};
