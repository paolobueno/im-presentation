import React from 'react';

export default ({thresh}) => {
  const table = '0 '.repeat(thresh) + '1 '.repeat(256 - thresh);
  return (
    <feComponentTransfer>
      <feFuncR type="discrete" tableValues={table} />
      <feFuncG type="discrete" tableValues={table} />
      <feFuncB type="discrete" tableValues={table} />
    </feComponentTransfer>
  );
};
