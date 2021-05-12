import { scaleOrdinal } from '@visx/scale';
import { Config, Data, OrdinalScale, ShapeType } from 'src/types';
import getKeys from 'utils/keys/getKeys';

interface Props {
  colors: Config['theme']['shapes'][ShapeType.BAR_STACKS]['colors'];
  data: Data;
  index: string;
}

export default ({ colors, data, index }: Props): OrdinalScale => {
  const keys = getKeys(data, index);

  return scaleOrdinal<string, string>({
    domain: keys,
    range: colors,
  });
};
