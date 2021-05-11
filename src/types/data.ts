export type Data = Datum[];

export interface Datum {
  [key: string]: number | string;
}

export type Keys = string[];

export type Index = string;

export interface Payload {
  data: Data;
  meta: {
    index: Index;
  };
}
