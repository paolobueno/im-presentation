import React from 'react';
import {times} from 'ramda';

export default ({thresh}) => {
  const table = times(i => (i > thresh ? '1' : '0'), 255).join(' ');
  return (
    <feComponentTransfer>
      <feFuncG type="discrete" tableValues={table} />
      <feFuncR type="discrete" tableValues={table} />
      <feFuncB type="discrete" tableValues={table} />
      <feFuncA type="identity" />
    </feComponentTransfer>
  );
};
