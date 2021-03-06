import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './navItem.css';

const navItem = props => (
  <li className={classes.NavItem}>
    <NavLink to={props.link} activeClassName={classes.active} exact={props.exact} onClick={props.clicked}>
      {props.children}
    </NavLink>
  </li>
);

export default navItem;