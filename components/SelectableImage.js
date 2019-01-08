import {lensProp, view, set} from 'ramda';
import React, {Fragment} from 'react';
import {getClickCoords, lensSetter} from './utils';

const coordsLens = lensProp('coords');

class SelectableImage extends React.Component {
  state = set(coordsLens, [0, 0], {});
  updateCoords = lensSetter(coordsLens);

  canvas = React.createRef();
  componentDidMount() {
    const {src} = this.props;
    const cnv = this.canvas.current;
    const ctx = cnv.getContext('2d');
    const img = new Image(cnv.width, cnv.height);
    img.crossOrigin = '';
    img.src = src;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
  }

  render() {
    const {width, height, imageStyle, onData, ...props} = this.props;
    const coords = view(coordsLens, this.state);
    return (
      <Fragment>
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
        <canvas
          ref={this.canvas}
          width={width}
          height={height}
          onClick={e => {
            const coords = getClickCoords(e);
            this.updateCoords(coords);

            const [_, y] = coords;
            const cnv = this.canvas.current;
            const {width, height} = cnv;
            const ctx = cnv.getContext('2d');
            ctx.drawImage(this.canvas.current, 0, 0);
            const imgData = ctx.getImageData(0, 0, width, height);
            const dataRow = imgData.data.slice((y - 1) * imgData.width * 4, y * imgData.width * 4);
            onData && onData(dataRow);
          }}
          {...props}
        />
      </Fragment>
    );
  }
}

export default SelectableImage;
