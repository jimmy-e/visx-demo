export type Data = Datum[];

export interface Datum {
  [key: string]: number | string;
}

export type Keys = string[];

export interface Payload {
  data: Data;
  meta: {
    index: string;
    keys: {
      allIds: string[];
      byId: Record<string, { label: string }>;
    };
  };
}
