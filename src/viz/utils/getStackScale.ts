import { scaleOrdinal } from '@visx/scale';
import { Config, Data, OrdinalScale } from 'src/types';
import getKeys from 'utils/getKeys';

interface Props {
  colors: Config['theme']['colors'];
  data: Data;
  index: string;
}

export default ({ colors, data, index }: Props): OrdinalScale => {
  const { colorOne, colorTwo, colorThree } = colors;
  const keys = getKeys(data, index);

  return scaleOrdinal<string, string>({
    domain: keys,
    range: [colorOne, colorTwo, colorThree],
  });
};
