import React, {useState} from 'react';
import styled from 'styled-components';
import ImgFilter from '../components/ImgFilter';
import Code from '../components/Code';

const Selectable = styled.div`
  border: ${({selected}) => (selected ? 'dotted' : 'none')} 0.05em;
`;

const filters = [
  {
    filter: (
      <feComponentTransfer>
        <feFuncG type="discrete" tableValues="0" />
        <feFuncB type="discrete" tableValues="0" />
      </feComponentTransfer>
    ),
    code: `<feComponentTransfer>
  <feFuncG type="discrete" tableValues="0" />
  <feFuncB type="discrete" tableValues="0" />
</feComponentTransfer>`,
  },
  {
    filter: (
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0" />
        <feFuncG type="table" tableValues="0 0 1" />
        <feFuncB type="discrete" tableValues="0" />
      </feComponentTransfer>
    ),
    code: `//...
  // linear interpolation: 66% => 0; 100% => 1
  <feFuncG type="table" tableValues="0 0 1" />`,
  },
  {
    filter: (
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0" />
        <feFuncG type="discrete" tableValues="0" />
        <feFuncB type="discrete" tableValues="0 1 1 1" />
      </feComponentTransfer>
    ),
    code: `//...
  // discrete: black up to 25%; else white
  <feFuncB type="discrete" tableValues="0 1 1 1" />`,
  },
];

export default ({src}) => {
  const [selected, setSelected] = useState(0);
  const code = filters[selected].code;

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{display: 'flex', height: '40vh'}}>
        {filters.map(({filter}, idx) => (
          <Selectable key={idx} onClick={() => setSelected(idx)} selected={selected === idx}>
            <ImgFilter style={{height: '100%', width: 'auto'}} src={src}>
              {filter}
            </ImgFilter>
          </Selectable>
        ))}
      </div>
      {/* 256px is to match the tallest 4 lines, empirical */}
      <Code customStyle={{minHeight: '256px'}}>{code}</Code>
    </div>
  );
};
