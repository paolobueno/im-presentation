import React, {useState} from 'react';
import {Line, LineChart, YAxis, XAxis} from 'recharts';
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
  const [vertical, setVertical] = useState(false);
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
        vertical={vertical}
        onDoubleClick={() => setVertical(!vertical)}
        onData={pixels => setLevels(processPxArray(pixels))}
      />
      <LineChart
        layout={vertical ? 'vertical' : 'horizontal'}
        data={levels}
        width={width * 0.7}
        height={height}
      >
        <YAxis type={vertical ? 'category' : 'number'} hide />
        <XAxis type={vertical ? 'number' : 'category'} hide />
        <Line dataKey="r" {...lineOpts} stroke="red" />
        <Line dataKey="g" {...lineOpts} stroke="green" />
        <Line dataKey="b" {...lineOpts} stroke="blue" />
      </LineChart>
    </div>
  );
};
