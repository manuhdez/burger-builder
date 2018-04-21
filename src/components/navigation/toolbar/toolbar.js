import React from 'react';
import classes from './toolbar.css';
import Logo from '../../logo/logo';
import NavItems from '../navigationItems/navItems';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;