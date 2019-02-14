import React, {useEffect, useRef, useState} from 'react';
import {loadGrayImage} from '../hooks';
import {discretize, getClickCoords} from '../utils';
import styled from 'styled-components';
import Code from '../components/Code';

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    'source dest'
    'fn fn';
  grid-row-gap: 0.5em;
`;

const rectStyle = {fill: 'none', stroke: 'red', strokeWidth: '3px'};

export default ({src, baseSize = 600}) => {
  const cnv = useRef(null);
  const imgRef = useRef(null);
  const {pixels, width, height} = loadGrayImage(src);
  const [mouseCoords, setMouseCoords] = useState(null);
  const pxWidth = baseSize / width;
  const pxHeight = baseSize / height;

  const getRectX = discretize(baseSize, width);
  const getRectY = discretize(baseSize, height);

  const rectX = mouseCoords && getRectX(mouseCoords[0]);
  const rectY = mouseCoords && getRectY(mouseCoords[1]);
  const pixelX = Math.ceil(rectX / pxWidth);
  const pixelY = Math.ceil(rectY / pxHeight);
  const pixelCode =
    mouseCoords &&
    `const {data, width} = canvas.getContext('2d').getImageData();
data[(${pixelY}/*y*/ * width + ${pixelX}/*x*/) * 4/*RGBA*/] === ${
  pixels[pixelY * width + pixelX]
};`;

  useEffect(
    function drawDestCanvas() {
      const canvas = cnv.current;
      if (!canvas || !pixels.length) {
        return;
      }
      const fontSize = `${baseSize / (width * 2)}px`;
      const ctx = canvas.getContext('2d');

      ctx.font = fontSize + ' monospace';

      // start at half of dimension to vert/horiz align
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let x = pxWidth / 2;
      let y = pxHeight / 2;

      pixels.forEach((px, i) => {
        ctx.fillStyle = `rgb(${px}, ${px}, ${px})`;
        ctx.fillText(px, x, y, pxWidth);
        x += pxWidth;

        // EOL?
        if ((i + 1) % width === 0) {
          // CR
          x = pxWidth / 2;
          // LF
          y += pxHeight;
        }
      });
    },
    [pixels, width, height],
  );

  const rect = (
    <rect width={pxWidth + 2} height={pxHeight + 2} x={rectX - 1} y={rectY - 1} style={rectStyle} />
  );
  const svgOverlay = (
    <svg width={baseSize} height={baseSize} style={{position: 'absolute'}}>
      {mouseCoords && rect}
    </svg>
  );

  return (
    <Layout>
      <div
        style={{width: baseSize, height: baseSize, gridArea: 'source'}}
        onMouseMove={e => setMouseCoords(getClickCoords(e))}
      >
        <img
          ref={imgRef}
          width={baseSize}
          height={baseSize}
          style={{imageRendering: 'pixelated', position: 'absolute'}}
          src={src}
        />
        {svgOverlay}
      </div>
      <div
        style={{width: baseSize, height: baseSize, gridArea: 'dest'}}
        onMouseMove={e => setMouseCoords(getClickCoords(e))}
      >
        <canvas ref={cnv} width={baseSize} height={baseSize} style={{position: 'absolute'}} />
        {svgOverlay}
      </div>

      <Code customStyle={{gridArea: 'fn'}}>{pixelCode}</Code>
    </Layout>
  );
};
