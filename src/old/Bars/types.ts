import { ScaleBand, ScaleLinear } from '../types';

export type Accessor = (d: any) => any;
export type Scale = XScale | YScale;
export type XScale = ScaleBand<string>;
export type YScale = ScaleLinear<number>;
