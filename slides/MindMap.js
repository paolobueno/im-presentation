import React, {useRef, useEffect} from 'react';
import * as d3 from 'd3';

const width = 900;
const colors = {
  svg: '#00B8A7',
  css: '#FDB300',
  ai: '#F02300',
  audio: '#074B9B',
  other: 'black',
};

const mindMap = {
  name: 'Computer Vision',
  children: [
    {
      name: 'Image Processing',
      children: [
        {
          name: 'Spatial',
          children: [
            {
              name: 'Linear',
              children: [
                {name: 'brightness', class: 'css'},
                {name: 'saturate', class: 'css'},
                {name: 'feComponentTransfer', class: 'svg'},
                {
                  name: 'Convolutions',
                  children: [
                    {
                      name: 'blur',
                      class: 'css',
                    },
                    {name: 'feGaussianBlur', class: 'svg'},
                    {name: 'feConvolveMatrix', class: 'svg'},
                  ],
                },
              ],
            },
            {
              name: 'Non-linear',
              children: [
                {name: 'median'},
                {name: 'bilateral'},
                {name: 'Thresholding', children: [{name: 'feComponentTransfer', class: 'svg'}]},
                {
                  name: 'Morphology',
                  children: [
                    {name: 'feMorphology', class: 'svg'},
                    {name: 'Dilation', class: 'svg'},
                    {name: 'Erosion', class: 'svg'},
                    {name: 'Opening'},
                    {name: 'Closing'},
                  ],
                },
              ],
            },
            {
              name: 'Multi-channel',
              children: [
                {name: 'grayscaling', class: 'css'},
                {name: 'hue-rotate', class: 'css'},
                {name: 'feColorMatrix', class: 'svg'},
                {
                  name: 'Mixing',
                  class: 'audio',
                  children: [
                    {name: 'feBlend', class: 'svg'},
                    {name: 'normal'},
                    {name: 'multiply'},
                    {name: 'screen'},
                    {name: 'darken'},
                    {name: 'lighten'},
                  ],
                },
              ],
            },
          ],
        },
        {
          name: 'Frequency',
          children: [
            {name: 'Fourier Transform'},
            {name: 'High-pass', class: 'audio', children: [{name: 'contrast', class: 'css'}]},
            {name: 'Low-pass', class: 'audio', children: [{name: 'blur', class: 'css'}]},
            {name: 'Phase', class: 'audio', children: [{name: 'invert', class: 'css'}]},
          ],
        },
      ],
    },
    {
      name: 'Feature Extraction',
      children: [
        {
          name: 'Descriptors',
          children: [{name: 'SIFT'}, {name: 'ORB'}, {name: 'MFCC', class: 'audio'}],
        },
        {name: 'Edges', children: [{name: 'Sobel'}, {name: 'Canny'}]},
        {name: 'Corners', children: [{name: 'Harris'}, {name: 'SUSAN'}]},
        {name: 'Connected components'},
        {name: 'CNN hidden layers', class: 'ai'},
      ],
    },
    {
      name: 'Recognition',
      children: [
        {
          name: 'Classification',
          children: [{name: 'Template matching'}, {name: 'CNN Pooling layers', class: 'ai'}],
          class: 'ai',
        },
        {
          name: 'Clustering',
          children: [{name: 'k-means', class: 'ai'}, {name: 'Linde-Buzo-Gray', class: 'audio'}],
          class: 'ai',
        },
      ],
    },
  ],
};

const tree = data =>
  d3
  .tree()
  .size([width, width])
  .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth)(d3.hierarchy(data));

const autosize = svg => {
  const box = svg.getBBox();
  svg.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`);
  return svg;
};

const setupTree = container => {
  const root = tree(mindMap);

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

export default () => {
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgRef.current) {
      setupTree(svgRef.current);
    }
  }, [svgRef.current]);
  return <svg ref={svgRef} width={width} height={width} />;
};
