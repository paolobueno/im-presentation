import React from "react";

const Thresh = ({thresh, inGraphic, outGraphic = "thresh"}) => {
  const table = "0 ".repeat(thresh) + "1 ".repeat(256 - thresh);
  return (
    <feComponentTransfer in={inGraphic} out={outGraphic}>
      <feFuncR type="discrete" tableValues={table} />
      <feFuncG type="discrete" tableValues={table} />
      <feFuncB type="discrete" tableValues={table} />
    </feComponentTransfer>
  );
};

export default Thresh;
