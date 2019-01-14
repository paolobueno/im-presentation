import React, {Fragment, memo} from 'react';
import {times} from 'ramda';

export default memo(({src, thresh, style, width, height, ...props}) => {
  const table = times(i => (i > thresh ? '1' : '0'), 255).join(' ');
  const filterId = `ImgThresh_filter_${src}${thresh}`;
  return (
    <Fragment>
      <svg width={0} height={0}>
        <filter id={filterId}>
          <feComponentTransfer>
            <feFuncG type="discrete" tableValues={table} />
            <feFuncR type="discrete" tableValues={table} />
            <feFuncB type="discrete" tableValues={table} />
            <feFuncA type="identity" />
          </feComponentTransfer>
        </filter>
      </svg>
      <img
        src={src}
        width={width}
        height={height}
        style={{filter: `grayscale() url("#${filterId}")`, ...style}}
        {...props}
      />
    </Fragment>
  );
});
