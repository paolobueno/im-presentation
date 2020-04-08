import React, {useEffect, useRef, useState, useCallback} from "react";
import {useGrayImage} from "../hooks";
import {discretize, getClickCoords} from "../utils";
import styled from "@emotion/styled";
import Code from "../components/Code";
import lenna from "../assets/lenna_small.png";

const Layout = styled.div`
  display: grid;
  grid-template-areas:
    "source dest"
    "fn fn";
  grid-row-gap: 0.5em;
`;

const rectStyle = {fill: "none", stroke: "red", strokeWidth: "3px"};

const ImagesAsArrays = ({baseSize = 600}) => {
  const cnv = useRef(null);
  const imgRef = useRef(null);
  const {pixels, width, height} = useGrayImage(lenna);
  const [mouseCoords, setMouseCoords] = useState(null);
  const pxWidth = baseSize / width;
  const pxHeight = baseSize / height;

  const getRectX = discretize(baseSize, width);
  const getRectY = discretize(baseSize, height);

  const rectX = mouseCoords && getRectX(mouseCoords[0]);
  const rectY = mouseCoords && getRectY(mouseCoords[1]);
  const pixelX = Math.ceil(rectX / pxWidth);
  const pixelY = Math.ceil(rectY / pxHeight);
  const pixelCode = `const {data, width} = canvas.getContext('2d').getImageData()
data[(${pixelY || 0}/*y*/ * width + ${pixelX || 0}/*x*/) * 4/*RGBA*/] === ${
    pixels[pixelY * width + pixelX] || 0
  }`;

  const handleMouseOver = useCallback(
    (e) => setMouseCoords(getClickCoords(e)),
    [setMouseCoords, getClickCoords],
  );

  useEffect(
    function drawDestCanvas() {
      const canvas = cnv.current;
      if (!canvas || !pixels.length) {
        return;
      }
      const fontSize = `${baseSize / (width * 2)}px`;
      const ctx = canvas.getContext("2d");

      ctx.font = fontSize + " monospace";

      // start at half of dimension to vert/horiz align
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let x = pxWidth / 2;
      let y = pxHeight / 2;

      pixels.forEach((px, i) => {
        ctx.fillStyle = `rgb(${px}, ${px}, ${px})`;
        ctx.fillText(px, x, y, pxWidth);
        x += pxWidth;

        // EOL?
        if ((i + 1) % width === 0) {
          // CR
          x = pxWidth / 2;
          // LF
          y += pxHeight;
        }
      });
    },
    [pixels, width, height],
  );

  const rect = (
    <rect
      width={pxWidth + 2}
      height={pxHeight + 2}
      x={rectX - 1}
      y={rectY - 1}
      style={rectStyle}
    />
  );
  const svgOverlay = (
    <svg
      width={baseSize}
      height={baseSize}
      style={{position: "absolute"}}
      onMouseMove={handleMouseOver}
      onMouseLeave={() => setMouseCoords(null)}
    >
      {mouseCoords && rect}
    </svg>
  );

  return (
    <Layout>
      <div
        style={{
          width: baseSize,
          height: baseSize,
          gridArea: "source",
        }}
      >
        <img
          ref={imgRef}
          width={baseSize}
          height={baseSize}
          style={{imageRendering: "pixelated", position: "absolute"}}
          src={lenna}
        />
        {svgOverlay}
      </div>
      <div
        style={{
          width: baseSize,
          height: baseSize,
          gridArea: "dest",
        }}
      >
        <canvas
          ref={cnv}
          width={baseSize}
          height={baseSize}
          style={{position: "absolute"}}
        />
        {svgOverlay}
      </div>

      <Code
        customStyle={{
          gridArea: "fn",
          opacity: mouseCoords ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      >
        {pixelCode}
      </Code>
    </Layout>
  );
};

export default ImagesAsArrays;
