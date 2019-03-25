import React from 'react';
import classes from './toolbar.css';
import Logo from '../../logo/logo';
import NavItems from '../navigationItems/navItems';
import DrawerToggle from '../sideDrawer/drawerToggle/drawerToggle';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavItems isUserAuth={props.isUserAuth} />
    </nav>
  </header>
);

export default toolbar;