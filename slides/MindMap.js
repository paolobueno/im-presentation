import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';

const colors = {
  svg: '#00B8A7',
  css: '#FDB300',
  ai: '#F02300',
  audio: '#074B9B',
  other: 'black',
};

const tree = (data, width, height) =>
  d3
  .tree()
  .size([height, width])
  .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)(d3.hierarchy(data));

const autosize = svg => {
  const box = svg.getBBox();
  svg.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
  return svg;
};

const setupTree = (root, container) => {
  const svg = d3
  .select(container)
  .style('width', '100%')
  .style('height', 'auto')
  .style('box-sizing', 'border-box')
  .style('font-size', '0.5em');

  svg.selectAll('*').remove();

  svg
  .append('g')
  .attr('fill', 'none')
  .attr('stroke', '#555')
  .attr('stroke-opacity', 0.2)
  .attr('stroke-width', 1)
  .selectAll('path')
  .data(root.links())
  .enter()
  .append('path')
  .attr(
    'd',
    d3
    .linkHorizontal()
    .x(d => d.y)
    .y(d => d.x),
  );

  const node = svg
  .append('g')
  .attr('stroke-linejoin', 'round')
  .attr('stroke-width', 3)
  .selectAll('g')
  .data(root.descendants())
  .enter()
  .append('g')
  .attr('transform', d => `translate(${d.y}, ${d.x})`);

  node
  .append('circle')
  .attr('fill', d => (d.children ? '#555' : '#999'))
  .attr('r', 2.5);

  node
  .append('text')
  .attr('dy', '0.31em')
  .attr('x', d => (d.children ? -6 : 6))
  .attr('text-anchor', d => (d.children ? 'end' : 'start'))
  .attr('fill', d => colors[d.data.class] || colors.other)
  .text(d => d.data.name)
  // white stroke
  .clone(true)
  .lower()
  .attr('stroke', 'white');

  autosize(svg.node());
};

export default ({map, width = 1200, height = 1200}) => {
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgRef.current) {
      const root = tree(map, width, height);
      setupTree(root, svgRef.current);
    }
  }, [svgRef.current, map]);
  return <svg ref={svgRef} width={width} height={height} />;
};
