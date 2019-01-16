import React, {useState, memo} from 'react';
import Thresh from '../components/filters/Thresh';
import ImgFilter from '../components/ImgFilter';
import InlineSlider from '../components/InlineSlider';
import styled from 'styled-components';
import {lighten} from 'polished';

const Activatable = styled.label`
  cursor: auto;
  opacity: ${({active}) => (active ? 1 : 0.5)};
`;

const LabelText = styled.span`
  font-size: small;
  color: ${({theme}) => lighten(0.5, theme.colors.text)};
`;

const Slider = styled.p`
  margin: 0;
  padding: 0.2em;
`;

export default memo(({src, ...props}) => {
  const [thresh, setThresh] = useState(100);
  const [active, setActive] = useState([true, true, true]);
  return (
    <div {...props} style={{...props.style, display: 'flex'}}>
      <div style={{flex: 1, height: '100%'}}>
        <ImgFilter style={{width: 'auto', height: '100%'}} src={src} cssPre="grayScale()">
          <Thresh thresh={thresh} />
        </ImgFilter>
      </div>
      <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
        <Activatable active>
          <LabelText>Threshold</LabelText>
          <InlineSlider
            startingValue={100}
            min={0}
            max={255}
            onChange={setThresh}
            Component={Slider}
          />
        </Activatable>
        <Activatable active>
          <LabelText>Dilate</LabelText>
          <InlineSlider
            startingValue={1}
            min={0}
            max={5}
            pixelsPerUnit={40}
            Component={Slider}
          />
        </Activatable>
      </div>
    </div>
  );
});
