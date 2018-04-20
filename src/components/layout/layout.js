import React from 'react';
import Aux from '../../hoc/aux';
import Toolbar from '../navigation/toolbar/toolbar';

import classes from './layout.css';

const layout = (props) => (
  <Aux>
    <Toolbar />
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;