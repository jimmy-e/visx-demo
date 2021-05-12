import { Payload } from 'src/types';

const streamEnrichment: Payload = {
  meta: {
    index: 'bin',
  },
  data: [
    { bin: '0-10', 'Enriched Streams': '0', 'Other Streams': '0' },
    { bin: '11-20', 'Enriched Streams': '0', 'Other Streams': '10' },
    { bin: '21-30', 'Enriched Streams': '0', 'Other Streams': '40' },
    { bin: '31-40', 'Enriched Streams': '0', 'Other Streams': '170' },
    { bin: '41-50', 'Enriched Streams': '50', 'Other Streams': '180' },
    { bin: '51-60', 'Enriched Streams': '90', 'Other Streams': '40' },
    { bin: '61-70', 'Enriched Streams': '30', 'Other Streams': '0' },
    { bin: '71-80', 'Enriched Streams': '20', 'Other Streams': '0' },
    { bin: '81-90', 'Enriched Streams': '10', 'Other Streams': '0' },
    { bin: '91-100', 'Enriched Streams': '0', 'Other Streams': '0' },
  ],
};

export default streamEnrichment;
