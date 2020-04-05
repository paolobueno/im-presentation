import React from "react";
import {Prism} from "react-syntax-highlighter";
import {atomDark} from "react-syntax-highlighter/dist/esm/styles/prism";

const Code = ({children, ...props}) => (
  <Prism language="jsx" {...props} style={atomDark}>
    {children}
  </Prism>
);

export default Code;
