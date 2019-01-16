import {swiss as theme} from 'mdx-deck/themes';
import {mergeDeepRight} from 'ramda';

export default mergeDeepRight(theme, {
  font: 'Work Sans, sans-serif',
  css: {
    userSelect: 'none',
  },
  heading: {
    fontFamily: 'Roboto Slab, sans-serif',
  },
});
