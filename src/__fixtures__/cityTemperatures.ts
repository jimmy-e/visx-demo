import { Payload, ShapeType } from 'src/types';

const cityTemperatures: Payload = {
  meta: {
    index: 'date',
    keys: {
      allIds: ['newYork', 'sanFrancisco', 'austin'],
      byId: {
        austin: {
          label: 'Austin',
        },
        newYork: {
          label: 'New York',
        },
        sanFrancisco: {
          label: 'San Francisco',
        },
      },
    },
    shape: {
      offset: 'auto',
      type: ShapeType.BAR_STACKS,
    },
  },
  data: [
    { date: '2012-05-13', newYork: '65.3', sanFrancisco: '52.0', austin: '72.4' },
    { date: '2012-05-14', newYork: '64.2', sanFrancisco: '56.0', austin: '72.5' },
    { date: '2012-05-15', newYork: '62.0', sanFrancisco: '53.0', austin: '67.6' },
    { date: '2012-05-16', newYork: '63.8', sanFrancisco: '51.0', austin: '69.0' },
    { date: '2012-05-17', newYork: '64.5', sanFrancisco: '51.4', austin: '72.7' },
    { date: '2012-05-18', newYork: '61.0', sanFrancisco: '52.2', austin: '73.7' },
    { date: '2012-05-19', newYork: '62.6', sanFrancisco: '52.4', austin: '77.5' },
    { date: '2012-05-20', newYork: '66.2', sanFrancisco: '54.5', austin: '75.8' },
    { date: '2012-05-21', newYork: '62.7', sanFrancisco: '52.8', austin: '76.9' },
    { date: '2012-05-22', newYork: '63.7', sanFrancisco: '53.9', austin: '78.8' },
    { date: '2012-05-23', newYork: '66.4', sanFrancisco: '56.5', austin: '77.7' },
    { date: '2012-05-24', newYork: '64.5', sanFrancisco: '54.7', austin: '80.6' },
    { date: '2012-05-25', newYork: '65.4', sanFrancisco: '52.5', austin: '81.4' },
    { date: '2012-05-26', newYork: '69.4', sanFrancisco: '52.1', austin: '82.3' },
    { date: '2012-05-27', newYork: '71.9', sanFrancisco: '52.2', austin: '80.3' },
    { date: '2012-05-28', newYork: '74.4', sanFrancisco: '52.9', austin: '80.3' },
    { date: '2012-05-29', newYork: '75.9', sanFrancisco: '52.1', austin: '82.2' },
    { date: '2012-05-30', newYork: '72.9', sanFrancisco: '52.1', austin: '81.9' },
    { date: '2012-05-31', newYork: '72.5', sanFrancisco: '53.3', austin: '82.4' },
    { date: '2012-06-01', newYork: '67.2', sanFrancisco: '54.8', austin: '77.9' },
    { date: '2012-06-02', newYork: '68.3', sanFrancisco: '54.0', austin: '81.1' },
    { date: '2012-06-03', newYork: '67.7', sanFrancisco: '52.3', austin: '82.2' },
    { date: '2012-06-04', newYork: '61.9', sanFrancisco: '55.3', austin: '81.2' },
    { date: '2012-06-05', newYork: '58.3', sanFrancisco: '53.5', austin: '83.0' },
    { date: '2012-06-06', newYork: '61.7', sanFrancisco: '54.1', austin: '83.2' },
    { date: '2012-06-07', newYork: '66.7', sanFrancisco: '53.9', austin: '82.1' },
    { date: '2012-06-08', newYork: '68.7', sanFrancisco: '54.4', austin: '77.5' },
    { date: '2012-06-09', newYork: '72.2', sanFrancisco: '55.0', austin: '77.9' },
    { date: '2012-06-10', newYork: '72.6', sanFrancisco: '60.0', austin: '82.9' },
    { date: '2012-06-11', newYork: '69.2', sanFrancisco: '57.2', austin: '86.8' },
    { date: '2012-06-12', newYork: '66.9', sanFrancisco: '55.1', austin: '85.3' },
    { date: '2012-06-13', newYork: '66.7', sanFrancisco: '53.3', austin: '76.9' },
    { date: '2012-06-14', newYork: '67.7', sanFrancisco: '53.4', austin: '84.5' },
    { date: '2012-06-15', newYork: '68.5', sanFrancisco: '54.6', austin: '84.4' },
    { date: '2012-06-16', newYork: '67.5', sanFrancisco: '57.0', austin: '83.8' },
    { date: '2012-06-17', newYork: '64.2', sanFrancisco: '55.6', austin: '82.5' },
    { date: '2012-06-18', newYork: '61.7', sanFrancisco: '52.5', austin: '82.9' },
    { date: '2012-06-19', newYork: '66.4', sanFrancisco: '53.9', austin: '82.5' },
    { date: '2012-06-20', newYork: '77.9', sanFrancisco: '55.3', austin: '81.3' },
    { date: '2012-06-21', newYork: '88.3', sanFrancisco: '53.3', austin: '80.8' },
    { date: '2012-06-22', newYork: '82.2', sanFrancisco: '54.1', austin: '81.7' },
    { date: '2012-06-23', newYork: '77.0', sanFrancisco: '55.2', austin: '83.9' },
    { date: '2012-06-24', newYork: '75.4', sanFrancisco: '55.8', austin: '85.5' },
    { date: '2012-06-25', newYork: '70.9', sanFrancisco: '56.8', austin: '87.2' },
    { date: '2012-06-26', newYork: '65.9', sanFrancisco: '57.5', austin: '88.0' },
    { date: '2012-06-27', newYork: '73.5', sanFrancisco: '57.7', austin: '89.6' },
    { date: '2012-06-28', newYork: '77.4', sanFrancisco: '56.6', austin: '86.7' },
    { date: '2012-06-29', newYork: '79.6', sanFrancisco: '56.4', austin: '85.3' },
    { date: '2012-06-30', newYork: '84.2', sanFrancisco: '58.4', austin: '81.7' },
    { date: '2012-07-01', newYork: '81.8', sanFrancisco: '58.8', austin: '78.5' },
  ],
};

export default cityTemperatures;
