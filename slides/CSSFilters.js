import React from 'react';
import styled from 'styled-components';
import Code from '../components/Code';

const rainbow = 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';

const Showcase = styled.div`
  width: 40vw;
  height: 120px;
  border-color: orange;
  border-radius: 5em;
  text-align: center;
  line-height: 20vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  background-color: orange;
`;

const Ball = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: ${({bg = 'blue'}) => bg};
  border: 1px solid black;
`;

const Button = styled.div`
  border-radius: 5px;
  padding: 0.2em;
  height: 40px;
  background-color: orange;
`;

export default () => (
  <div>
    <Showcase style={{filter: ''}}>
      <Ball />
      <Ball bg="red" />
      <Ball bg="green" />
      <Ball style={{background: rainbow}} />
      Hello
    </Showcase>
    <div style={{display: 'flex', justifyContent: 'space-evenly', padding: '0.3em'}}>
      <Button>blur</Button>
      <Button>contrast</Button>
      <Button>grayscale</Button>
      <Button>hue-rotate</Button>
    </div>
    <Code language="css">{'filter: contrast(50);'}</Code>
  </div>
);
