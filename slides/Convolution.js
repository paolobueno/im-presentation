import {clamp, multiply, sum, zipWith} from 'ramda';
import React, {memo, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import InlineSlider from '../components/InlineSlider';
import {loadImage} from '../hooks';
import {discretize, getClickCoords} from '../utils';

const P = styled.p`
  margin: 0.2em;
  text-align: center;
  font-size: 0.75em;
`;

const Container = styled.div`
  display: grid;
  width: 70vw;
  grid-column-gap: 1rem;
  grid-row-gap: 0.5rem;
  grid-template-areas:
    'source dest'
    'select sources'
    'calc calc';
  justify-items: center;
`;

const BlocksContainer = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
`;
const Bl = styled.div`
  border: 1px solid black;
  font-size: 0.5em;
  height: 3em;
  width: 3em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BlShaded = ({children, style, ...props}) => (
  <Bl
    {...props}
    style={{
      backgroundColor: `rgb(${children}, ${children}, ${children})`,
      color: children > 128 ? 'black' : 'white',
      ...style,
    }}
  >
    {children}
  </Bl>
);

const filterId = 'convolution-filter';

const drawWithFilter = (imageData, canvas, filter) => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.filter = filter;
  const ctx = canvas.getContext('2d');
  createImageBitmap(imageData).then(bmp => {
    tempCtx.drawImage(bmp, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
  });
};

const kernels = {
  'Box Blur': [1, 1, 1, 1, 5, 1, 1, 1, 1],
  'Gaussian Blur': [1, 2, 1, 2, 4, 2, 1, 2, 1],
  'Sharpen': [0, -1, 0, -1, 4, -1, 0, -1, 0],
  'Sobel Horizontal': [-1, 0, 1, -2, 0, 2, -1, 0, 1],
  'Sobel Vertical': [-1, -2, -1, 0, 0, 0, 1, 2, 1],
  'Emboss (diagonal)': [-2, -1, 0, -1, 0, 1, 0, 1, 2],
};

export default memo(({src, baseWidth, baseHeight}) => {
  const [kernel, setKernel] = useState([1, 1, 1, 1, 5, 1, 1, 1, 1]);
  const [mouseCoords, setMouseCoords] = useState(null);

  const setKernelAt = i => v => {
    const k = [...kernel];
    k[i] = v;
    setKernel(k);
  };

  const {imageData, ready, width, height} = loadImage(src);
  const pxWidth = baseWidth / width;
  const pxHeight = baseHeight / height;

  const getRectX = discretize(baseWidth, width);
  const getRectY = discretize(baseHeight, height);
  const rectX = mouseCoords && getRectX(mouseCoords[0]);
  const rectY = mouseCoords && getRectY(mouseCoords[1]);
  const pixelX = Math.ceil(rectX / pxWidth);
  const pixelY = Math.ceil(rectY / pxHeight);
  const clampX = clamp(0, width);
  const clampY = clamp(0, height);

  const getPx = (x, y) => (ready ? imageData.data[y * width * 4 + x * 4] : 0);
  const divisor = sum(kernel) || 1;
  const targetPixels = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [0, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ].map(([x, y]) => getPx(clampX(x + pixelX), clampY(y + pixelY)));

  const cnv = useRef(null);
  useEffect(
    function draw() {
      if (!cnv.current || !ready) {
        return;
      }
      drawWithFilter(imageData, cnv.current, `grayscale() url(#${filterId})`);
    },
    [src, kernel, ready, cnv.current],
  );

  return (
    <Container>
      <svg width="0" height="0">
        <filter id={filterId}>
          <feConvolveMatrix
            kernelMatrix={kernel.join(' ')}
            preserveAlpha="true"
            edgeMode="duplicate"
          />
        </filter>
      </svg>

      <div
        style={{width: baseWidth, height: baseHeight, gridArea: 'source'}}
        onMouseMove={e => setMouseCoords(getClickCoords(e))}
      >
        <img
          src={src}
          width={baseWidth}
          height={baseHeight}
          style={{imageRendering: 'pixelated', position: 'absolute'}}
        />
        <svg width={baseWidth} height={baseHeight} style={{position: 'absolute'}}>
          {mouseCoords && (
            <rect
              width={pxWidth * 3}
              height={pxHeight * 3}
              x={rectX - pxWidth}
              y={rectY - pxHeight}
              style={{fill: 'none', stroke: 'red', strokeDasharray: '4'}}
            />
          )}
        </svg>
      </div>

      <div
        style={{
          width: baseWidth,
          height: baseHeight,
          gridArea: 'dest',
        }}
        onMouseMove={e => setMouseCoords(getClickCoords(e))}
      >
        <canvas ref={cnv} width={baseWidth} height={baseHeight} style={{position: 'absolute'}} />
        <svg width={baseWidth} height={baseHeight} style={{position: 'absolute'}}>
          {mouseCoords && (
            <rect
              width={pxWidth}
              height={pxHeight}
              x={rectX}
              y={rectY}
              style={{fill: 'none', stroke: 'red'}}
            />
          )}
        </svg>
      </div>
      <select style={{gridArea: 'select'}} onChange={e => setKernel(JSON.parse(e.target.value))}>
        {Object.entries(kernels).map(([k, v]) => (
          <option key={k} value={JSON.stringify(v)}>
            {k}
          </option>
        ))}
      </select>

      <div
        style={{
          width: '100%',
          gridArea: 'calc',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        <div>
          <BlocksContainer>
            {kernel.map((v, i) => (
              <InlineSlider
                Component={Bl}
                min={-10}
                max={10}
                pixelsPerUnit={20}
                onChange={setKernelAt(i)}
                key={i}
                i={i}
                value={v}
              />
            ))}
          </BlocksContainer>
        </div>
        <P>×</P>
        <BlocksContainer>
          {targetPixels && targetPixels.map((v, i) => <BlShaded key={i}>{v}</BlShaded>)}
        </BlocksContainer>
        <P>÷</P>
        <Bl>{divisor}</Bl>
        <P>=</P>
        <BlShaded>
          {Math.round(sum(zipWith(multiply, [...kernel].reverse(), targetPixels)) / divisor)}
        </BlShaded>
      </div>
    </Container>
  );
});
