import React, {useEffect, useState, useRef} from 'react';
import {getClickCoords} from '../utils';

const baseSize = 600;

const discretize = (n, length, steps) => {
  const stepSize = length / steps;
  const step = Math.floor(n / stepSize);
  return stepSize * step;
};

const loadGrayImage = img => {
  const [pixels, setPixels] = useState([]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  useEffect(
    () => {
      if (!img) {
        return;
      }
      // img.onload = () => {
      const cnv = document.createElement('canvas');
      cnv.width = img.naturalWidth;
      cnv.height = img.naturalHeight;
      const ctx = cnv.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, cnv.width, cnv.height);
      const redPx = [];
      for (let i = 0; i < imgData.data.length; i += 4) {
        redPx.push(imgData.data[i]);
      }
      setPixels(redPx);
      setWidth(cnv.width);
      setHeight(cnv.height);
      // };
    },
    [img],
  );

  return {pixels, width, height};
};

export default ({src}) => {
  const cnv = useRef(null);
  const imgRef = useRef(null);
  const {pixels, width, height} = loadGrayImage(imgRef.current);
  const [mouseCoords, setMouseCoords] = useState(null);
  const pxWidth = baseSize / width;
  const pxHeight = baseSize / height;

  // draw pixels
  useEffect(
    () => {
      const canvas = cnv.current;
      if (!canvas || !pixels.length) {
        return;
      }
      const fontSize = `${baseSize / (width * 2)}px`;
      const ctx = canvas.getContext('2d');

      ctx.font = fontSize + ' monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let x = pxWidth / 2;
      let y = pxHeight / 2;
      pixels.forEach((px, i) => {
        ctx.fillStyle = `rgb(${px}, ${px}, ${px})`;
        ctx.fillText(px, x, y, pxWidth);
        x += pxWidth;
        if ((i + 1) % width === 0) {
          y += pxHeight;
          x = pxWidth / 2;
        }
      });
    },
    [pixels],
  );

  return (
    <div style={{display: 'flex', width: baseSize * 2}}>
      <img
        ref={imgRef}
        width={baseSize}
        height={baseSize}
        style={{imageRendering: 'pixelated'}}
        src={src}
        onMouseMove={e => setMouseCoords(getClickCoords(e))}
        onMouseLeave={() => setMouseCoords(null)}
      />
      <div>
        <canvas ref={cnv} width={baseSize} height={baseSize} style={{position: 'absolute'}} />
        <svg width={baseSize} height={baseSize} style={{position: 'absolute'}}>
          {mouseCoords && (
            <rect
              width={pxWidth}
              height={pxHeight}
              x={discretize(mouseCoords[0], baseSize, width)}
              y={discretize(mouseCoords[1], baseSize, height)}
              style={{fill: 'none', stroke: 'red'}}
            />
          )}
        </svg>
      </div>
    </div>
  );
};
