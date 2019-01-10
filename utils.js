import {set} from 'ramda';

export const getClickCoords = e => {
  const {left, top} = e.target.getBoundingClientRect();
  return [Math.round(e.clientX - left), Math.round(e.pageY - top)];
};

export function lensSetter(lens) {
  return function(value) {
    this.setState(set(lens, value, this.state));
  };
}
