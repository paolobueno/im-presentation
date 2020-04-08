import React from "react";
import ReactDOM from "react-dom";
import theme from "./theme";
import {
  Deck,
  Slide,
  FlexBox,
  Box,
  FullScreen,
  Progress,
  Heading,
} from "spectacle";

// eslint-disable-next-line no-undef
if (module.hot) {
  // eslint-disable-next-line no-undef
  module.hot.accept();
}

const template = () => (
  <FlexBox
    justifyContent="space-between"
    position="absolute"
    bottom={0}
    width={1}
  >
    <Box padding="0 1em">
      <FullScreen />
    </Box>
    <Box padding="1em">
      <Progress />
    </Box>
  </FlexBox>
);

const Presentation = () => (
  <Deck theme={theme} transitionEffect="fade" template={template}>
    <Slide>
      <FlexBox>
        <Heading>A Look into Computer Vision</Heading>
      </FlexBox>
    </Slide>
  </Deck>
);

ReactDOM.render(<Presentation />, document.getElementById("root"));
