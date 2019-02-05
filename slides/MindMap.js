import React from 'react';
import styled from 'styled-components';

const Group = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const List = styled.ul`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-evenly;
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 0.85em;
`;

const Title = styled.div`
  flex: 1;
  background-color: green;
  border-radius: 4px;
  border: 2px solid yellow;
  padding: 0.2em;
`;

const Item = styled.li`
  background-color: green;
  border-radius: 4px;
  border: 2px solid darkgreen;
  padding: 0.2em;
`;

export default () => (
  <List>
    <Group>
      <Title>Computer Vision</Title>
      <List>
        <Item>Image Acquisition</Item>
        <Group>
          <Title>Image Processing</Title>
          <List>
            <Item>Spatial</Item>
            <Item>Frequency</Item>
          </List>
        </Group>
        <Item>Feature Extraction</Item>
        <Item>Segmentation</Item>
        <Item>Recognition</Item>
      </List>
    </Group>
    <Group>
      <Title>Web</Title>
      <List>
        <Item>DOM</Item>
        <Item>CSS</Item>
        <Item>WebGL</Item>
      </List>
    </Group>
  </List>
);
