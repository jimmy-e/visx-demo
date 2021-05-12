import { Data, Keys } from 'src/types';

// ToDo: Memoize?
export default (data: Data, index: string): Keys => (
  Object.keys(data[0]).filter(key => key !== index) as Keys
);
