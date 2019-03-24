import React from 'react';
import classes from './navItems.css';
import NavItem from './navigationItem/navItem';

const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>Burger Builder</NavItem>
    <NavItem link="/orders" >Orders</NavItem>
    <NavItem link="/auth" >Log in</NavItem>
  </ul>
);

export default navItems;