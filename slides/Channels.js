import React, {useState} from 'react';
import styled from 'styled-components';
import Code from 'mdx-deck/dist/Code';

const SelectableImage = styled.img`
  width: 100%;
  border: ${({selected}) => (selected ? 'dotted' : 'none')};
`;

const filters = (
  <svg width="0" height="0">
    <filter id="filter-red">
      <feComponentTransfer>
        <feFuncG type="discrete" tableValues="0" />
        <feFuncR type="identity" tableValues="0" />
        <feFuncB type="discrete" tableValues="0" />
        <feFuncA type="identity" />
      </feComponentTransfer>
    </filter>
    <filter id="filter-green">
      <feComponentTransfer>
        <feFuncG type="identity" tableValues="0" />
        <feFuncR type="discrete" tableValues="0" />
        <feFuncB type="discrete" tableValues="0" />
        <feFuncA type="identity" />
      </feComponentTransfer>
    </filter>
    <filter id="filter-blue">
      <feComponentTransfer>
        <feFuncG type="discrete" tableValues="0" />
        <feFuncR type="discrete" tableValues="0" />
        <feFuncB type="identity" tableValues="0" />
        <feFuncA type="identity" />
      </feComponentTransfer>
    </filter>
  </svg>
);

const filterDeclarations = [
  `<feComponentTransfer>
  <feFuncG type="discrete" tableValues="0" />
  <feFuncR type="identity" tableValues="0" />
  <feFuncB type="discrete" tableValues="0" />
  <feFuncA type="identity" />
</feComponentTransfer>`,
  `<feComponentTransfer>
  <feFuncG type="identity" />
  <feFuncR type="discrete" tableValues="0" />
  <feFuncB type="discrete" tableValues="0" />
  <feFuncA type="identity" />
</feComponentTransfer>`,
  `<feComponentTransfer>
<feFuncG type="discrete" tableValues="0" />
<feFuncR type="discrete" tableValues="0" />
<feFuncB type="identity" tableValues="0" />
<feFuncA type="identity" />
</feComponentTransfer>`,
];

const ImgContainer = styled.div`
  width: 10vw;
`;

export default ({src}) => {
  const [selected, setSelected] = useState(null);
  const toggleSelect = value => () => setSelected(selected === value ? null : value);
  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {filters}
        <div style={{flex: 2, width: '30vh'}}>
          <img src={src} style={{width: '100%'}} />
        </div>
        <div style={{display: 'flex', flex: 1}}>
          <ImgContainer>
            <SelectableImage
              src={src}
              onClick={toggleSelect('r')}
              selected={selected === 'r'}
              style={{filter: 'url(#filter-red)'}}
            />
          </ImgContainer>
          <ImgContainer>
            <SelectableImage
              src={src}
              onClick={toggleSelect('g')}
              selected={selected === 'g'}
              style={{filter: 'url(#filter-green)'}}
            />
          </ImgContainer>
          <ImgContainer>
            <SelectableImage
              src={src}
              onClick={toggleSelect('b')}
              selected={selected === 'b'}
              style={{filter: 'url(#filter-blue)'}}
            />
          </ImgContainer>
        </div>
      </div>
      <Code className="language-js">{`<feComponentTransfer>
  <feFuncG type="discrete" tableValues="0" />
  <feFuncR type="discrete" tableValues="0" />
  <feFuncB type="identity" tableValues="0" />
  <feFuncA type="identity" />
</feComponentTransfer>`}</Code>
    </div>
  );
};
