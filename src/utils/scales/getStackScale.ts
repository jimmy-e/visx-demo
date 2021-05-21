import { scaleOrdinal } from '@visx/scale';
import { Config, OrdinalScale, Payload, ShapeType } from 'src/types';

export default (
  colors: Config['theme']['shapes'][ShapeType.BAR_STACKS]['colors'],
  payload: Payload,
): OrdinalScale => scaleOrdinal<string, string>({
  domain: payload.meta.keys.allIds,
  range: colors,
});
