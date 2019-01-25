import {useState, useEffect} from 'react';

const loadImageData = (img, scale, filter = '') => {
  const cnv = document.createElement('canvas');
  cnv.width = img.naturalWidth * scale;
  cnv.height = img.naturalHeight * scale;
  const ctx = cnv.getContext('2d');
  ctx.filter = filter;
  ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
  return {
    imageData: ctx.getImageData(0, 0, cnv.width, cnv.height),
    width: cnv.width,
    height: cnv.height,
  };
};

export const loadImage = (src, scale = 1, filter = '') => {
  const [data, setData] = useState({pixels: [], width: 0, height: 0, ready: false});
  useEffect(
    function renderImage() {
      const img = new Image();
      img.src = src;
      img.crossOrigin = '';
      img.onload = () => {
        const {imageData, width, height} = loadImageData(img, scale, filter);
        if (imageData.data.length > 0 && imageData.data.some(x => x > 0)) {
          setData({imageData, width, height, ready: true});
        }
      };
    },
    [src],
  );

  return data;
};

const loadPixels = (img, scale, filter = 'grayscale()') => {
  const {imageData, width, height} = loadImageData(img, scale, filter);
  const pixels = [];
  for (let i = 0; i < imageData.data.length; i += 4) {
    pixels.push(imageData.data[i]);
  }
  return {pixels, width, height};
};

export const loadGrayImage = (src, scale = 1) => {
  const [data, setData] = useState({pixels: [], width: 0, height: 0, ready: false});
  useEffect(
    function reportRedChannel() {
      const img = new Image();
      img.src = src;
      img.crossOrigin = '';
      img.onload = () => {
        const {pixels, width, height} = loadPixels(img, scale);
        if (pixels.length > 0 && pixels.some(x => x > 0)) {
          setData({pixels, width, height, ready: true});
        }
      };
    },
    [src],
  );

  return data;
};
