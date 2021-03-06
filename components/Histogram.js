import {map, toPairs, sortBy, prop, compose, reduce} from 'ramda';
import React, {useRef, useState, useEffect, memo} from 'react';
import {ComposedChart, Line, ResponsiveContainer, XAxis} from 'recharts';
import {loadGrayImage} from '../hooks';

const chartHeight = 300;

const hist = arr => {
  const res = {};
  arr.forEach(x => {
    res[x] = res[x] || 0;
    res[x] += 1;
  });
  const data = compose(
    sortBy(prop('key')),
    map(([key, value]) => ({key: Number(key), value})),
    toPairs,
  )(res);
  return data;
};

const otsu = (histogram, total) => {
  let sum0 = 0;
  let p0 = 0;
  let maxVariance = 0;
  const totalValues = reduce((accum, {key, value}) => accum + key * value, 0, histogram);

  let otsuLevel = 0;

  // histogram needs to be sorted
  histogram.forEach(({key, value}) => {
    p0 += value;
    const p1 = total - p0;
    if (p1 === 0 || p0 === 0) {
      return;
    }
    sum0 += key * value;
    const mean1 = (totalValues - sum0) / p1;
    const sigma = sum0 / p0 - mean1;
    const between = p0 * p1 * sigma * sigma;
    if (between > maxVariance) {
      otsuLevel = key;
      maxVariance = between;
    }
  });
  return otsuLevel;
};

export default memo(({onClick, src, style}) => {
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const otsuThresh = useRef(0);

  const {pixels} = loadGrayImage(src, 0.1);

  const data = hist(pixels);
  useEffect(
    function calcOtsu() {
      otsuThresh.current = otsu(data, pixels.length);
    },
    [pixels],
  );

  let chartWidth = 0;
  const chartRef = useRef(null);
  if (chartRef.current) {
    chartWidth = chartRef.current.container.clientWidth;
  }

  return (
    <div style={style}>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <ComposedChart
          data={data}
          ref={chartRef}
          onClick={() => setDragging(!dragging)}
          onMouseLeave={() => setDragging(false)}
          onMouseMove={e => {
            if (!e || !dragging) {
              return;
            }
            const {chartX} = e;
            setX(chartX);
            const value = Math.floor((chartX / chartWidth) * 255);
            onClick(value);
          }}
        >
          <XAxis dataKey="key" type="number" domain={[0, 255]} hide />
          <Line dataKey="value" dot={false} stroke="red" />
          {x > 0 ? <rect x={x} width={1} height="100%" fill="red" /> : null}
          {otsuThresh.current ? (
            <rect x={chartWidth * (otsuThresh.current / 255)} width={1} height="100%" fill="blue" />
          ) : null}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
});
