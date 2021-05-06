import { Data, Keys } from 'src/types';

export default (data: Data, index: string): Keys => (
  Object.keys(data[0]).filter(key => key !== index) as Keys
);
