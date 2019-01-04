import React, {Fragment, useState} from 'react';
import {getClickCoords} from './utils';

export default ({onSelect, ...props}) => {
  const [coords, updateCoords] = useState([null, null]);
  console.log(coords);
  return (
    <Fragment>
      <svg width={0} height={0}>
        <filter>
          <feFlood />
        </filter>
      </svg>
      <img {...props} onClick={e => updateCoords(getClickCoords(e))} />
    </Fragment>
  );
};
