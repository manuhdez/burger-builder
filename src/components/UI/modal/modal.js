import React, { Component } from 'react';
import classes from './modal.css';
import Aux from '../../../hoc/aux/aux';
import Backdrop from '../backdrop/backdrop';

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }

  // componentWillUpdate() {
  //   console.log('[Modal] Component will update');
  // }

  render() {
    const styling = {
      transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
    };

    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div className={classes.Modal} style={styling}>
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;