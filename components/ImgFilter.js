import React from 'react';
import Filter from './Filter';

export default props => <Filter {...props} render={props => <img {...props} />} />;
