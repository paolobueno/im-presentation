import {swiss as theme} from 'mdx-deck/themes';
import {mergeDeepRight} from 'ramda';

export default mergeDeepRight(theme, {
  font: 'Work Sans, sans-serif',
  fontSizes: ['0.5em', '0.75em', '1.3em', '1.5em', '2em'],
  css: {
    userSelect: 'none',
    fontSize: '12px',
  },
  heading: {
    fontFamily: 'Roboto Slab, sans-serif',
  },
});
