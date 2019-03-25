import React from 'react';
import classes from './navItems.css';
import NavItem from './navigationItem/navItem';

const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>Burger Builder</NavItem>
    { props.isUserAuth
      ? <NavItem link="/orders" >Orders</NavItem>
      : null
    }
    { props.isUserAuth
      ? <NavItem link="/logout" >Log out</NavItem>
      : <NavItem link="/auth" >Log in</NavItem>
    }
  </ul>
);

export default navItems;