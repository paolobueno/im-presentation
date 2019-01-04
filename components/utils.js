export const getClickCoords = e => {
  const {left, top} = e.target.getBoundingClientRect();
  return [Math.round(e.clientX - left), Math.round(e.pageY - top)];
};
