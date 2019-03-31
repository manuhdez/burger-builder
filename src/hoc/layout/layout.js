import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../aux/aux';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';
import classes from './layout.css';

const layout = props => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  }

  const sideDrawerToggleHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  }

  return (
    <Aux>
      <Toolbar
        isUserAuth={props.isUserAuth}
        drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer
        isUserAuth={props.isUserAuth}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler} />
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isUserAuth: state.auth.idToken ? true : false
  };
};

export default connect(mapStateToProps)(layout);
