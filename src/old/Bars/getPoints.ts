import { LetterFrequency } from '@visx/mock-data/lib/mocks/letterFrequency';
import { Accessor, Scale, XScale, YScale } from './types';

interface Props {
  xAccessor: Accessor;
  xScale: XScale;
  yAccessor: Accessor;
  yScale: YScale;
}

const compose = (scale: Scale, accessor: Accessor) => (datum: LetterFrequency) => scale(accessor(datum));

export default ({ xAccessor, xScale, yAccessor, yScale }: Props) => ({
  xPoint: compose(xScale, xAccessor),
  yPoint: compose(yScale, yAccessor),
});
