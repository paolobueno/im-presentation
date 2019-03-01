import {max, min, path} from 'ramda';

export const minOf = arr => arr.reduce(min, Infinity);
export const maxOf = arr => arr.reduce(max, 0);

export const getClickCoords = e => {
  // currentTarget = original react component
  // e.target can be a child
  const {left, top} = e.currentTarget.getBoundingClientRect();
  const res = [Math.round(e.clientX - left), Math.round(e.clientY - top)];
  return res;
};

export const discretize = (length, steps) => n => {
  const stepSize = length / steps;
  const step = Math.floor(n / stepSize);
  return stepSize * step;
};

export const themeProp = p => path(['theme', p]);
