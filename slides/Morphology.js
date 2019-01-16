import React, {memo} from 'react';
import Thresh from '../components/filters/Thresh';
import ImgFilter from '../components/ImgFilter';

export default memo(({src, ...props}) => (
  <div {...props} style={{...props.style, display: 'flex'}}>
    <div style={{flex: 1, height: '100%'}}>
      <ImgFilter style={{width: 'auto', height: '100%'}} src={src} cssPre="grayScale()">
        <Thresh thresh={100} />
      </ImgFilter>
    </div>
    <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
      <span>Threshold</span>
    </div>
  </div>
));
