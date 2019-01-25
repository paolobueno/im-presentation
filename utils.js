import {max, min} from 'ramda';

export const minOf = arr => arr.reduce(min, Infinity);
export const maxOf = arr => arr.reduce(max, 0);

export const getClickCoords = e => {
  const {left, top} = e.target.getBoundingClientRect();
  return [Math.round(e.clientX - left), Math.round(e.pageY - top)];
};

export const discretize = (length, steps) => n => {
  const stepSize = length / steps;
  const step = Math.floor(n / stepSize);
  return stepSize * step;
};
