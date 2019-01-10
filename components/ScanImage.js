import {lensProp, set, view} from 'ramda';
import React from 'react';
import {getClickCoords, lensSetter} from '../utils';

const coordsLens = lensProp('coords');

const Line = ({top, left, vertical}) => (
  <div
    style={{
      width: vertical ? 1 : '100%',
      height: vertical ? '100%' : 1,
      backgroundColor: 'magenta',
      position: 'absolute',
      display: 'inline',
      top: vertical ? 0 : top,
      left: vertical ? left : 0,
      transition: 'all, 0.3s',
      zIndex: 10,
    }}
  />
);

class ScanImage extends React.Component {
  state = set(coordsLens, [0, 0], {});
  updateCoords = lensSetter(coordsLens);
  img = null;

  canvas = React.createRef();
  componentDidMount() {
    this.setupImg();
  }
  componentDidUpdate(prevProps) {
    const {filter} = this.props;
    const {filter: prevFilter} = prevProps;
    if (filter !== prevFilter) {
      this.updateFilter(filter);
    }
  }

  updateFilter = filter => {
    const cnv = this.canvas.current;
    const img = this.img;
    const ctx = cnv.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    if (!filter) {
      return;
    }

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = cnv.width;
    tempCanvas.height = cnv.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.filter = filter;
    tempCtx.drawImage(cnv, 0, 0);
    ctx.drawImage(tempCanvas, 0, 0);
  };

  draw = ctx => {
    const img = this.img;
    if (!ctx) {
      const cnv = this.canvas.current;
      ctx = cnv.getContext('2d');
    }
    ctx.drawImage(img, 0, 0, img.width, img.height);
  };

  setupImg = () => {
    const {src} = this.props;
    const cnv = this.canvas.current;
    this.img = new Image(cnv.width, cnv.height);
    this.img.crossOrigin = 'anonymous';
    this.img.src = src;
    this.img.onload = () => this.draw();
  };

  render() {
    const {width, height, onData, onDoubleClick, vertical, ...props} = this.props;
    const coords = view(coordsLens, this.state);
    return (
      <div style={{width, height, position: 'relative'}} onDoubleClick={onDoubleClick}>
        {coords[0] ? <Line top={coords[1]} left={coords[0]} vertical={vertical} /> : null}
        <canvas
          ref={this.canvas}
          width={width}
          height={height}
          style={{position: 'absolute'}}
          onClick={e => {
            const coords = getClickCoords(e);
            this.updateCoords(coords);

            if (typeof onData === 'function') {
              const [x, y] = coords;
              const cnv = this.canvas.current;
              const {width, height} = cnv;
              const ctx = cnv.getContext('2d');
              ctx.drawImage(this.canvas.current, 0, 0);
              const imgData = ctx.getImageData(0, 0, width, height);
              if (!vertical) {
                const dataRow = imgData.data.slice(
                  (y - 1) * imgData.width * 4,
                  y * imgData.width * 4,
                );
                onData(dataRow);
              } else {
                const data = [];
                for (let i = x * 4; i < imgData.data.length; i += imgData.width * 4) {
                  data.push(imgData.data[i]);
                  data.push(imgData.data[i + 1]);
                  data.push(imgData.data[i + 2]);
                  data.push(imgData.data[i + 3]);
                }
                onData(data);
              }
            }
          }}
          {...props}
        />
      </div>
    );
  }
}

export default ScanImage;
