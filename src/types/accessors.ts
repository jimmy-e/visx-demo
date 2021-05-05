import { Datum } from './data';

export type Accessor = (datum: Datum) => number | string;
