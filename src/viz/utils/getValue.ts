import { Datum, Index } from 'src/types';

export default (datum: Datum, index: Index) => String(datum[index]);
