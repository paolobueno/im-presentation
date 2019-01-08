import React, {Fragment, useState} from 'react';
import SelectableImage from '../components/SelectableImage';
import {LineChart, Line, Tooltip, YAxis} from 'recharts';

const width = 400;
const height = 250;

const processPxArray = pixels => {
  const res = [];
  for (let i = 0; i < pixels.length; i += 4) {
    res.push({
      r: pixels[i],
      g: pixels[i + 1],
      b: pixels[i + 2],
      a: pixels[i + 3],
    });
  }

  return res;
};

export default () => {
  const [data, setData] = useState([]);
  console.log(data[0]);
  const lineOpts = {
    dot: false,
    animationDuration: 300,
    type: 'monotone',
  };
  return (
    <Fragment>
      <SelectableImage
        src="assets/fruits.jpg"
        width={width}
        height={height}
        onData={pixels => setData(processPxArray(pixels))}
      />
      <LineChart data={data} width={width} height={height}>
        <Line dataKey="r" {...lineOpts} stroke="red" />
        <Line dataKey="g" {...lineOpts} stroke="green" />
        <Line dataKey="b" {...lineOpts} stroke="blue" />
      </LineChart>
    </Fragment>
  );
};
