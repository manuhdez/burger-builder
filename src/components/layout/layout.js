import React from 'react';
import Aux from '../../hoc/aux';

const layout = (props) => (
  <Aux>
    <div>toolbar, sidedrawer, backdrop</div>
    <main>
      {props.children}
    </main>
  </Aux>
);