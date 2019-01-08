import React, {Fragment, Component} from 'react';
import {getClickCoords} from './utils';

class SelectableImage extends Component {
  constructor() {
    super();
    this.state = {
      coords: [null, null],
    };
  }
  updateCoords = (coords) => {
    this.setState({coords});
  }
  render() {
    const {coords} = this.state;
    return (
      <Fragment>
        <svg width={0} height={0}>
          <filter>
            <feFlood />
          </filter>
        </svg>
        <img {...this.props} onClick={e => this.updateCoords(getClickCoords(e))} />
      </Fragment>
    );
  }
}

export default SelectableImage;
