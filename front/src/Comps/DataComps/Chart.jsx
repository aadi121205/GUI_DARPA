import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function DifferentLength() {
  const randomizeData = (length) => {
    return Array.from({ length }, () => Math.random() * 10);
  };

  return (
    <>
      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
        series={[
          {
            data: randomizeData(6),
            valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
          },
          {
            data: [null, null, null, ...randomizeData(6)],
          },
          {
            data: [7, 8, 5, 4, null, null, ...randomizeData(3)],
            valueFormatter: (value) => (value == null ? '?' : value.toString()),
          },
        ]}
        height={200}
        margin={{ top: 10, bottom: 20 }}
      />
    </>
  );
}
