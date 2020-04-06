import React, {useState, memo} from "react";
import Thresh from "../components/filters/Thresh";
import ImgFilter from "../components/ImgFilter";
import InlineSlider from "../components/InlineSlider";
import styled from "styled-components";
import {lighten} from "polished";
import {compose, filter, prop, toPairs, map, mergeDeepRight} from "ramda";
import src from "../assets/segmentation1.png";
import theme from "../theme";

const Activatable = styled.label`
  cursor: pointer;
  opacity: ${({disabled}) => (disabled ? 0.5 : 1)};
  background-color: ${({disabled}) => (disabled ? "#ccc" : "transparent")};
  border-radius: 0.2em;
  padding: 0.3em;
  margin: 0.1em 0;
`;

const LabelText = styled.span`
  font-size: 0.75em;
  line-height: 0.5;
  color: ${() => lighten(0.2, theme.colors.primary)};
`;

const Slider = styled.p`
  margin: 0;
  padding: 0.2em;
`;

const mapPairs = (fn) => compose(map(fn), toPairs);

const createFilters = compose(
  mapPairs(([key, {value, operators}]) =>
    map(
      (operator) => (
        <feMorphology key={key + operator} operator={operator} radius={value} />
      ),
      operators,
    ),
  ),
  filter(prop("active")),
);

const Morphology = memo(function Morphology({...props}) {
  const [thresh, setThresh] = useState(100);
  const [invert, setInvert] = useState(false);
  const [operators, setOperators] = useState({
    "Dilate ⊕": {operators: ["dilate"], active: false, value: 1},
    "Erode ⊖": {operators: ["erode"], active: false, value: 1},
    "Close ⊖ ∘ ⊕": {operators: ["dilate", "erode"], active: false, value: 1},
    "Open ⊕ ∘ ⊖": {operators: ["erode", "dilate"], active: false, value: 1},
  });

  return (
    <div {...props} style={{...props.style, display: "flex"}}>
      <img src={src} height="60px" style={{margin: "0.2em"}} />
      <div style={{flex: 1}}>
        <ImgFilter
          style={{width: "auto", height: "100%"}}
          src={src}
          cssPre="grayScale()"
        >
          {invert ? (
            <feComponentTransfer>
              <feFuncR type="table" tableValues="1 0" />
              <feFuncG type="table" tableValues="1 0" />
              <feFuncB type="table" tableValues="1 0" />
            </feComponentTransfer>
          ) : null}
          <Thresh thresh={thresh} />
          {createFilters(operators)}
        </ImgFilter>
      </div>
      <div
        style={{display: "flex", flex: "0.3 0.3 0%", flexDirection: "column"}}
      >
        <Activatable
          onDoubleClick={() => {
            setThresh(255 - thresh);
            setInvert(!invert);
          }}
        >
          <LabelText>Threshold</LabelText>
          <InlineSlider
            value={thresh}
            min={0}
            max={255}
            onChange={setThresh}
            Component={Slider}
            format={(x) => (invert ? `${x} (inv)` : x)}
          />
        </Activatable>

        {mapPairs(([key, {active, value}]) => (
          <Activatable
            key={key}
            disabled={!active}
            onDoubleClick={() =>
              setOperators(
                mergeDeepRight(operators, {[key]: {value, active: !active}}),
              )
            }
          >
            <LabelText>{key}</LabelText>
            <InlineSlider
              value={value}
              onChange={(v) =>
                setOperators(
                  mergeDeepRight(operators, {[key]: {value: v, active: true}}),
                )
              }
              min={0}
              max={40}
              pixelsPerUnit={40}
              format={(x) => `${x}px`}
              Component={Slider}
            />
          </Activatable>
        ))(operators)}
      </div>
    </div>
  );
});

export default Morphology;
