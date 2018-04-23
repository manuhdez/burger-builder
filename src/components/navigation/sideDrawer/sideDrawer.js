import React from 'react';
import classes from './sideDrawer.css';
import Logo from '../../logo/logo';
import NavItems from '../navigationItems/navItems';
import Backdrop from '../../UI/backdrop/backdrop';
import Aux from '../../../hoc/aux/aux';

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;