import React from 'react';
import classes from './toolbar.css';
import Logo from '../../logo/logo';
import NavItems from '../navigationItems/navItems';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <Logo />
    <nav>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;