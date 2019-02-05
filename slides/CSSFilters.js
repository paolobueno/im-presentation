import React, {useState} from 'react';
import styled from 'styled-components';
import Code from '../components/Code';
import {Item, Toggler} from '../components/Toggler';

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
  background-color: #ffb400;
`;

const Ball = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: ${({bg = 'blue'}) => bg};
  border: 1px solid black;
`;

const innerShadow = 'inset 0 0 10px black';
const Button = styled.div`
  border-radius: 5px;
  padding: 0.2em;
  background-color: ${({active}) => (active ? '#00b8a7' : '#ffb400')};
  box-shadow: ${({active}) => (active ? innerShadow : 'none')};
  transition: all ease-in-out 0.3s;
`;

export default () => {
  const [filter, setFilter] = useState('');
  return (
    <div>
      <Showcase style={{filter}}>
        <Ball bg="blue" />
        <Ball bg="red" />
        <Ball bg="green" />
        <Ball style={{background: rainbow}} />
        Hello
      </Showcase>
      <div style={{display: 'flex', justifyContent: 'space-evenly', padding: '0.3em'}}>
        <Toggler onChange={arr => setFilter(arr.join(' '))}>
          <Item value="blur(3px)">
            <Button>blur</Button>
          </Item>
          <Item value="contrast(0.5)">
            <Button>contrast</Button>
          </Item>
          <Item value="grayscale()">
            <Button>grayscale</Button>
          </Item>
          <Item value="hue-rotate(90deg)">
            <Button>hue-rotate</Button>
          </Item>
        </Toggler>
      </div>
      <Code language="css">{`filter: ${filter || 'none'};`}</Code>
    </div>
  );
};
