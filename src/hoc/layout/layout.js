import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../aux/aux';
import Toolbar from '../../components/navigation/toolbar/toolbar';
import SideDrawer from '../../components/navigation/sideDrawer/sideDrawer';
import classes from './layout.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState( (prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar
          isUserAuth={this.props.isUserAuth}
          drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isUserAuth={this.props.isUserAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isUserAuth: state.auth.idToken ? true : false
  };
};

export default connect(mapStateToProps)(Layout);
