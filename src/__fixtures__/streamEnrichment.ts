import { Payload, ShapeType } from 'src/types';

const streamEnrichment: Payload = {
  meta: {
    index: 'bin',
    keys: {
      allIds: ['enrichedStreams', 'otherStreams'],
      byId: {
        enrichedStreams: {
          label: 'Enriched Streams',
        },
        otherStreams: {
          label: 'Other Streams',
        },
      },
    },
    shape: {
      type: ShapeType.BAR_STACKS,
    },
  },
  data: [
    { bin: '0-10', enrichedStreams: '0', otherStreams: '0' },
    { bin: '11-20', enrichedStreams: '0', otherStreams: '10' },
    { bin: '21-30', enrichedStreams: '0', otherStreams: '40' },
    { bin: '31-40', enrichedStreams: '0', otherStreams: '170' },
    { bin: '41-50', enrichedStreams: '50', otherStreams: '180' },
    { bin: '51-60', enrichedStreams: '90', otherStreams: '40' },
    { bin: '61-70', enrichedStreams: '30', otherStreams: '0' },
    { bin: '71-80', enrichedStreams: '20', otherStreams: '0' },
    { bin: '81-90', enrichedStreams: '10', otherStreams: '0' },
    { bin: '91-100', enrichedStreams: '0', otherStreams: '0' },
  ],
};

export default streamEnrichment;
