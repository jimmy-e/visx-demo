export type Data = Datum[];

export interface Datum {
  [key: string]: number | string;
}

export type Keys = string[];

export interface Payload {
  data: Data;
  meta: {
    index: string;
    keyOrder: string[];
    keys: Record<string, { label: string }>;
  };
}
