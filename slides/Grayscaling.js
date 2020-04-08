import React, {useState, useCallback} from "react";
import styled from "@emotion/styled";
import Thresh from "../components/filters/Thresh";
import Histogram from "../components/Histogram";
import ImgFilter from "../components/ImgFilter";

import maze from "../assets/maze_eq.jpg";
import donuts from "../assets/building_donuts.jpg";
import coins from "../assets/segmentation1.png";

const imgs = [maze, donuts, coins];

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Grayscaling = () => {
  const [thresh, setThresh] = useState(100);
  const [images, setImages] = useState(imgs);

  const nextImage = useCallback(() => {
    setImages(([head, ...tail]) => [...tail, head]);
  });
  const src = images[0];
  return (
    <Container>
      <div
        style={{
          gridRow: 1,
          gridColumn: 1,
          maxHeight: 400,
          textAlign: "center",
        }}
        onClick={nextImage}
      >
        <img height={400} src={src} />
      </div>

      <div
        style={{
          gridRow: 1,
          gridColumn: 2,
          maxHeight: 400,
          textAlign: "center",
        }}
      >
        <ImgFilter height={400} src={src} cssPre="grayscale()">
          <Thresh thresh={thresh} />
        </ImgFilter>
      </div>
      <Histogram
        style={{gridRow: 2, gridColumn: "1 / span 2"}}
        src={src}
        onClick={setThresh}
      />
    </Container>
  );
};

export default Grayscaling;
