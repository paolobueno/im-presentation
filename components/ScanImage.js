import {lensProp, view, set} from 'ramda';
import React, {Fragment} from 'react';
import {getClickCoords, lensSetter} from '../utils';

const coordsLens = lensProp('coords');

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
    const {width, height, imageStyle, onData, ...props} = this.props;
    const coords = view(coordsLens, this.state);
    return (
      <div>
        {coords[1] ? (
          <div
            style={{
              width,
              backgroundColor: 'magenta',
              height: 1,
              position: 'relative',
              top: coords[1],
              transition: 'top 0.3s',
            }}
          />
        ) : null}
        <canvas
          ref={this.canvas}
          width={width}
          height={height}
          onClick={e => {
            const coords = getClickCoords(e);
            this.updateCoords(coords);

            if (typeof onData === 'function') {
              const [_, y] = coords;
              const cnv = this.canvas.current;
              const {width, height} = cnv;
              const ctx = cnv.getContext('2d');
              ctx.drawImage(this.canvas.current, 0, 0);
              const imgData = ctx.getImageData(0, 0, width, height);
              const dataRow = imgData.data.slice(
                (y - 1) * imgData.width * 4,
                y * imgData.width * 4,
              );
              onData(dataRow);
            }
          }}
          {...props}
        />
      </div>
    );
  }
}

export default ScanImage;
