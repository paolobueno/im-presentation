import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import Thresh from '../components/filters/Thresh';
import Histogram from '../components/Histogram';
import ImgFilter from '../components/ImgFilter';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export default ({src, width, height}) => {
  const img = useRef(null);
  const [thresh, setThresh] = useState(100);
  return (
    <Container>
      <img
        width={width}
        height={height}
        style={{
          gridRow: 1,
          gridColumn: 1,
          filter: 'grayscale()',
        }}
        ref={img}
        src={src}
      />
      <ImgFilter
        height={height}
        width={width}
        style={{gridRow: 1, gridColumn: 2}}
        src={src}
        cssPre="grayscale()"
      >
        <Thresh thresh={thresh} />
      </ImgFilter>
      <Histogram style={{gridRow: 2, gridColumn: '1 / span 2'}} src={src} onClick={setThresh} />
    </Container>
  );
};
