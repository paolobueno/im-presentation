import {sum} from 'ramda';
import React, {memo, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import InlineSlider from '../components/InlineSlider';
import {loadImage} from '../hooks';

const SourceImg = styled.img`
  width: 'auto';
  height: '100%';
  max-height: 100px;
`;
const Source = ({setSrc, src, ...props}) => (
  <SourceImg src={src} onClick={() => setSrc(src)} {...props} />
);

const P = styled.p`
  margin: 0.2em;
  text-align: center;
  font-size: 0.75em;
`;

const Container = styled.div`
  display: grid;
  width: 70vw;
  grid-column-gap: 1rem;
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
  'Sobel Horizontal': [-1, 0, 1, -2, 0, 2, -1, 0, -1],
  'Sobel Vertical': [-1, -2, -1, 0, 0, 0, 1, 2, 1],
  'Emboss (diagonal)': [-2, -1, 0, -1, 0, 1, 0, 1, 2],
};

export default memo(({src, width, height}) => {
  const [kernel, setKernel] = useState([1, 1, 1, 1, 5, 1, 1, 1, 1]);
  const setKernelAt = i => v => {
    const k = [...kernel];
    k[i] = v;
    setKernel(k);
  };
  const divisor = sum(kernel);

  const {imageData, ready} = loadImage(src);

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
          <feConvolveMatrix kernelMatrix={kernel.join(' ')} preserveAlpha="true" edgeMode="none" />
        </filter>
      </svg>

      <img
        src={src}
        width={width}
        height={height}
        style={{gridArea: 'source', imageRendering: 'pixelated'}}
      />
      <canvas
        style={{
          gridArea: 'dest',
        }}
        ref={cnv}
        width={width}
        height={height}
      />
      <select
        onChange={e => setKernel(JSON.parse(e.target.value))}
        style={{margin: '0.2em', gridArea: 'select'}}
      >
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
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
        </BlocksContainer>
        <P>÷</P>
        <Bl>{divisor}</Bl>
        <P>=</P>
        <BlocksContainer>
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
          <Bl />
        </BlocksContainer>
      </div>
    </Container>
  );
});
