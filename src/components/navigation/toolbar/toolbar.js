import React from 'react';
import classes from './toolbar.css';
import Logo from '../../logo/logo';

const toolbar = props => (
  <header className={classes.Toolbar}>
  <div>Menu</div>
  <Logo />
  </header>
);

export default toolbar;