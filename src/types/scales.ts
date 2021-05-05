type ScaleBand<Input> = import('d3-scale').ScaleBand<Input>;
type ScaleLinear<Output> = import('d3-scale').ScaleLinear<Output, Output, never>;
type ScaleOrdinal<Input, Output> = import('d3-scale').ScaleOrdinal<Input, Output, never>;

export type BandScale = ScaleBand<string>;
export type LinearScale = ScaleLinear<number>;
export type OrdinalScale = ScaleOrdinal<string, string>;
