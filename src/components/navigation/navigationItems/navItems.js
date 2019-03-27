import React from 'react';
import classes from './navItems.css';
import NavItem from './navigationItem/navItem';

const navItems = props => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact clicked={props.clicked} >Burger Builder</NavItem>
    { props.isUserAuth
      ? <NavItem link="/orders" clicked={props.clicked} >Orders</NavItem>
      : null
    }
    { props.isUserAuth
      ? <NavItem link="/logout" clicked={props.clicked} >Log out</NavItem>
      : <NavItem link="/auth" clicked={props.clicked} >Log in</NavItem>
    }
  </ul>
);

export default navItems;