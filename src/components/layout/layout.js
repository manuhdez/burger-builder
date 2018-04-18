import React from 'react';
import Aux from '../../hoc/aux';

import classes from './layout.css';

const layout = (props) => (
  <Aux>
    <div>toolbar, sidedrawer, backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;