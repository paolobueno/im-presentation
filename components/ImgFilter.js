import React, {Fragment, memo} from 'react';
import uuid from 'uuid/v4';

export default memo(({src, style, width, height, cssPre, cssPost, children, ...props}) => {
  const filterId = uuid();
  const filter = [cssPre, `url("#${filterId}")`, cssPost].join(' ');
  return (
    <Fragment>
      <svg style={{display: 'absolute'}} width={0} height={0}>
        <filter id={filterId}>{children}</filter>
      </svg>
      <img src={src} width={width} height={height} style={{filter, ...style}} {...props} />
    </Fragment>
  );
});
