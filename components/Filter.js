import React, {Fragment, memo} from 'react';
import uuid from 'uuid/v4';

export default memo(({cssPre, cssPost, children, render, style, ...props}) => {
  const filterId = uuid();
  const filter = [cssPre, `url("#${filterId}")`, cssPost].join(' ');
  return (
    <Fragment>
      <svg style={{display: 'absolute'}} width={0} height={0}>
        <filter id={filterId}>{children}</filter>
      </svg>
      {render({style: {...style, filter}, ...props})}
    </Fragment>
  );
});
