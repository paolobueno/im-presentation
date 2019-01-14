import React, {useState} from 'react';
import styled from 'styled-components';
import Code from 'mdx-deck/dist/Code';
import {map, prop} from 'ramda';

const SelectableImage = styled.img`
  height: 100%;
  width: auto;
  border: ${({selected}) => (selected ? 'dotted' : 'none')} 1px;
  box-sizing: border-box;
`;

const filters = [
  {
    el: (
      <filter id="filter-red">
        <feComponentTransfer>
          <feFuncG type="discrete" tableValues="0" />
          <feFuncB type="discrete" tableValues="0" />
        </feComponentTransfer>
      </filter>
    ),
    code: `<feComponentTransfer>
  <feFuncG type="discrete" tableValues="0" />
  <feFuncB type="discrete" tableValues="0" />
</feComponentTransfer>`,
  },
  {
    el: (
      <filter id="filter-green">
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0" />
          <feFuncG type="table" tableValues="0 0 1" />
          <feFuncB type="discrete" tableValues="0" />
        </feComponentTransfer>
      </filter>
    ),
    code: `<feComponentTransfer>
  <feFuncR type="discrete" tableValues="0" />
  <feFuncG type="table" tableValues="0 0 1" />
  <feFuncB type="discrete" tableValues="0" />
</feComponentTransfer>`,
  },
  {
    el: (
      <filter id="filter-blue">
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0" />
          <feFuncG type="discrete" tableValues="0" />
          <feFuncB type="discrete" tableValues="0 1 1 1" />
        </feComponentTransfer>
      </filter>
    ),
    code: `<feComponentTransfer>
  <feFuncG type="discrete" tableValues="0" />
  <feFuncR type="discrete" tableValues="0" />
  <feFuncB type="discrete" tableValues="0 1 1 1" />
</feComponentTransfer>`,
  },
];

export default ({src}) => {
  const [selected, setSelected] = useState(0);
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <svg width="0" height="0">
        {map(prop('el'), filters)}
      </svg>
      <div style={{display: 'flex', flex: 1, margin: '1em'}}>
        <SelectableImage
          src={src}
          onClick={() => setSelected(0)}
          selected={selected === 0}
          style={{filter: 'url(#filter-red)'}}
        />
        <SelectableImage
          src={src}
          onClick={() => setSelected(1)}
          selected={selected === 1}
          style={{filter: 'url(#filter-green)'}}
        />
        <SelectableImage
          src={src}
          onClick={() => setSelected(2)}
          selected={selected === 2}
          style={{filter: 'url(#filter-blue)'}}
        />
      </div>
      <Code className="language-js">{filters[selected].code}</Code>
    </div>
  );
};
