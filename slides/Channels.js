import React, {useState} from 'react';
import styled from 'styled-components';
import Code from 'mdx-deck/dist/Code';
import ImgFilter from '../components/ImgFilter';
import {renderToStaticMarkup} from 'react-dom/server';

const Selectable = styled.div`
  border: ${({selected}) => (selected ? 'dotted' : 'none')} 1px;
`;

const filters = [
  <feComponentTransfer>
    <feFuncR type="identity" />
    <feFuncG type="discrete" tableValues="0" />
    <feFuncB type="discrete" tableValues="0" />
  </feComponentTransfer>,
  <feComponentTransfer>
    <feFuncR type="discrete" tableValues="0" />
    <feFuncG type="table" tableValues="0 0 1" />
    <feFuncB type="discrete" tableValues="0" />
  </feComponentTransfer>,
  <feComponentTransfer>
    <feFuncR type="discrete" tableValues="0" />
    <feFuncG type="discrete" tableValues="0" />
    <feFuncB type="discrete" tableValues="0 1 1 1" />
  </feComponentTransfer>,
];

export default ({src}) => {
  const [selected, setSelected] = useState(0);
  const code = renderToStaticMarkup(filters[selected]).replace(/>/g, '>\n');

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', height: '40vh'}}>
        {filters.map((filter, idx) => (
          <Selectable key={idx} onClick={() => setSelected(idx)} selected={selected === idx}>
            <ImgFilter style={{height: '100%', width: 'auto'}} src={src}>
              {filter}
            </ImgFilter>
          </Selectable>
        ))}
      </div>
      <Code className="language-js">
        {code}
      </Code>
    </div>
  );
};
