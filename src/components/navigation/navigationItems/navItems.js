import React from 'react';
import classes from './navItems.css';
import NavItem from './navigationItem/navItem';

const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="/" active >Burger Builder</NavItem>
    <NavItem link="/" >Checkout</NavItem>
  </ul>
);

export default navItems;