import React, {useRef, useState, memo} from 'react';
import styled from 'styled-components';
import Thresh from '../components/filters/Thresh';
import Histogram from '../components/Histogram';
import ImgFilter from '../components/ImgFilter';
import {loadGrayImage} from '../hooks';
import {maxOf, minOf} from '../utils';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default memo(({src, width, height}) => {
  const img = useRef(null);
  const [thresh, setThresh] = useState(100);
  const {pixels, ready} = loadGrayImage(src, 0.1);

  const max = ready ? maxOf(pixels) : 0;
  const min = ready ? minOf(pixels) : 0;
  const intercept = -(min / 255);
  const slope = 255 / (max - min);

  return (
    <Container>
      <img
        width={width}
        height={height}
        style={{
          gridRow: 1,
          gridColumn: 1,
          filter: 'grayscale() contrast()',
        }}
        ref={img}
        src={src}
      />
      <ImgFilter
        height={height}
        width={width}
        style={{gridRow: 1, gridColumn: 2}}
        src={src}
        cssPre="grayscale() contrast()"
      >
        <feComponentTransfer>
          <feFuncR type="linear" intercept={intercept} slope={slope} />
          <feFuncG type="linear" intercept={intercept} slope={slope} />
          <feFuncB type="linear" intercept={intercept} slope={slope} />
        </feComponentTransfer>
        <Thresh thresh={thresh} />
      </ImgFilter>
      <Histogram style={{gridRow: 2, gridColumn: '1 / span 2'}} src={src} onClick={setThresh} />
    </Container>
  );
});
