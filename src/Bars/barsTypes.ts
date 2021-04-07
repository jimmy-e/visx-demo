export type Accessor = (d: any) => any;
export type Scale = XScale | YScale;
type ScaleBand<Input> = import('d3-scale').ScaleBand<Input>;
type ScaleLinear<Output> = import('d3-scale').ScaleLinear<Output, Output, never>;
export type XScale = ScaleBand<string>;
export type YScale = ScaleLinear<number>;
