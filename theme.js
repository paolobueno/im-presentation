import {themes} from "mdx-deck";
import {mergeDeepRight} from "ramda";

export default mergeDeepRight(themes.swiss, {
  fonts: {
    body: ["Montserrat, sans-serif"],
    heading: ["Montserrat, sans-serif"],
  },
  fontSizes: ["0.5em", "1em", "1.3em", "1.5em", "1.75em"],
  fontWeights: {
    body: 400,
    heading: 800,
    bold: 800,
  },
  css: {
    userSelect: "none",
    fontSize: "12px",
  },
  colors: {
    text: "#24374E",
    background: "#fff",
    primary: "#24374D",
  },
  styles: {
    root: {
      textAlign: "center",
    },
    Slide: {
      display: "block",
      padding: "2em",
      textAlign: "center",
    },
  },
});
