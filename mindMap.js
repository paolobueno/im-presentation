import {clone} from 'ramda';

const mindMap = {
  name: 'Computer Vision',
  children: [
    {
      name: 'Image Processing',
      children: [
        {name: 'Pre-processing', class: 'ai'},
        {
          name: 'Transform',
          children: [
            {name: 'translate', class: 'css'},
            {name: 'rotate', class: 'css'},
            {name: 'scale', class: 'css'},
            {name: 'shear', class: 'css'},
            {name: 'feOffset', class: 'svg'},
          ],
        },
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
            {
              name: 'Thresholding',
              children: [{name: 'feComponentTransfer', class: 'svg'}],
            },
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
      name: 'Feature Extraction',
      children: [
        {name: 'Dimensionality Reduction', class: 'ai'},
        {name: 'Connected components'},
        {name: 'CNN hidden layers', class: 'ai'},
        {name: 'Edges', children: [{name: 'Sobel'}, {name: 'Canny'}]},
        {name: 'Corners', children: [{name: 'Harris'}, {name: 'SUSAN'}]},
        {
          name: 'Descriptors',
          children: [{name: 'SIFT'}, {name: 'SURF'}, {name: 'MFCC', class: 'audio'}],
        },
      ],
    },
    {
      name: 'Recognition',
      children: [
        {name: 'Classification', class: 'ai'},
        {name: 'Template matching'},
        {name: 'Feature matching'},
        {name: 'CNN Pooling layers', class: 'ai'},
        {
          name: 'Clustering',
          children: [{name: 'k-means', class: 'ai'}, {name: 'Linde-Buzo-Gray', class: 'audio'}],
          class: 'ai',
        },
      ],
    },
  ],
};

export const shallow = clone(mindMap);
shallow.children.forEach(c => delete c.children);

export const ImageProcessing = mindMap.children[0];

export const SpatialImageProcessing = ImageProcessing;

export default mindMap;
