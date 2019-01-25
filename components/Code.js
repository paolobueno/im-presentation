import React from 'react';
import Prism from 'react-syntax-highlighter/prism';
import {atomDark} from 'react-syntax-highlighter/dist/styles/prism';

export default ({children, ...props}) => (
  <Prism language="jsx" {...props} style={atomDark}>
    {children}
  </Prism>
);
