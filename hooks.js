import {useState, useEffect} from 'react';

const loadPixels = (img, scale, filter = 'grayscale()') => {
  const cnv = document.createElement('canvas');
  cnv.width = img.naturalWidth * scale;
  cnv.height = img.naturalHeight * scale;
  const ctx = cnv.getContext('2d');
  ctx.filter = filter;
  ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
  const imgData = ctx.getImageData(0, 0, cnv.width, cnv.height);
  const pixels = [];
  for (let i = 0; i < imgData.data.length; i += 4) {
    pixels.push(imgData.data[i]);
  }
  return {pixels, width: cnv.width, height: cnv.height};
};

export const loadGrayImage = (src, scale = 1) => {
  const [data, setData] = useState({pixels: [], width: 0, height: 0, ready: false});
  useEffect(
    () => {
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
