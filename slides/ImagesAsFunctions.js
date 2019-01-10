import React, {useState} from 'react';
import {Line, LineChart} from 'recharts';
import ScanImage from '../components/ScanImage';

const width = 800;
const height = 500;

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
  const [levels, setLevels] = useState([]);
  const lineOpts = {
    dot: false,
    animationDuration: 300,
  };
  return (
    <div style={{display: 'flex'}}>
      <ScanImage
        src="assets/fruits.jpg"
        width={width}
        height={height}
        onData={pixels => setLevels(processPxArray(pixels))}
      />
      <LineChart data={levels} width={width * 0.75} height={height}>
        <Line dataKey="r" {...lineOpts} stroke="red" />
        <Line dataKey="g" {...lineOpts} stroke="green" />
        <Line dataKey="b" {...lineOpts} stroke="blue" />
      </LineChart>
    </div>
  );
};
