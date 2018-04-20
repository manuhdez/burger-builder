import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './logo.css';

const logo = props => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Myburger Logo"/>
  </div>
);

export default logo;