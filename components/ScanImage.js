import React, {useEffect, useRef, useState} from 'react';
import {getClickCoords} from '../utils';

const lineThickness = 3;

const Line = ({top, left, vertical}) => (
  <div
    style={{
      width: vertical ? lineThickness : '100%',
      height: vertical ? '100%' : lineThickness,
      backgroundColor: 'magenta',
      position: 'absolute',
      display: 'inline',
      top: vertical ? 0 : top - 1,
      left: vertical ? left - 1 : 0,
      transition: 'all, 0.3s',
      zIndex: 10,
    }}
  />
);

export default ({src, filter, width, height, onData, onDoubleClick, vertical, ...props}) => {
  const [coords, updateCoords] = useState([0, 0]);
  const image = useRef(null);
  const canvas = useRef(null);

  useEffect(
    function renderImage() {
      const cnv = canvas.current;
      image.current = new Image(cnv.width, cnv.height);
      const img = image.current;
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => {
        const img = image.current;
        const cnv = canvas.current;
        const ctx = cnv.getContext('2d');
        ctx.drawImage(img, 0, 0, img.width, img.height);
      };
    },
    [canvas.current, src],
  );

  useEffect(
    function updateFilter() {
      const cnv = canvas.current;
      const ctx = cnv.getContext('2d');
      const img = image.current;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      if (!filter) {
        return;
      }

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = cnv.width;
      tempCanvas.height = cnv.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.filter = filter;
      tempCtx.drawImage(cnv, 0, 0);
      ctx.drawImage(tempCanvas, 0, 0);
    },
    [filter],
  );

  useEffect(
    function reportOnData() {
      if (typeof onData === 'function') {
        const [x, y] = coords;
        const cnv = canvas.current;
        const {width, height} = cnv;
        const ctx = cnv.getContext('2d');
        const imgData = ctx.getImageData(0, 0, width, height);
        if (!vertical) {
          const dataRow = imgData.data.slice((y - 1) * imgData.width * 4, y * imgData.width * 4);
          onData(dataRow);
        } else {
          const data = [];
          for (let i = x * 4; i < imgData.data.length; i += imgData.width * 4) {
            data.push(imgData.data[i]);
            data.push(imgData.data[i + 1]);
            data.push(imgData.data[i + 2]);
            data.push(imgData.data[i + 3]);
          }
          onData(data);
        }
      }
    },
    [coords, vertical],
  );

  return (
    <div style={{width, height, position: 'relative'}} onDoubleClick={onDoubleClick}>
      {coords[0] ? <Line top={coords[1]} left={coords[0]} vertical={vertical} /> : null}
      <canvas
        ref={canvas}
        width={width}
        height={height}
        style={{position: 'absolute'}}
        onClick={e => {
          const coords = getClickCoords(e);
          updateCoords(coords);
        }}
        {...props}
      />
    </div>
  );
};
