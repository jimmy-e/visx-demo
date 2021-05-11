import { Data, Index, Keys } from 'src/types';

// ToDo: Memoize?
export default (data: Data, index: Index): Keys => (
  Object.keys(data[0]).filter(key => key !== index) as Keys
);
