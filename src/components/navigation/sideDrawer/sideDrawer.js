import React from 'react';
import classes from './sideDrawer.css';
import Logo from '../../logo/logo';
import NavItems from '../navigationItems/navItems';

const sideDrawer = props => {

  return (
    <div className={classes.SideDrawer}>
      <Logo />
      <nav>
        <NavItems />
      </nav>
    </div>
  );
};

export default sideDrawer;