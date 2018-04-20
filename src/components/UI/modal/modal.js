import React from 'react';
import classes from './modal.css';
import Aux from '../../../hoc/aux';
import Backdrop from '../backdrop/backdrop';

const modal = (props) => {
  const styling = {
    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0'
  };

  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={classes.Modal} style={styling}>
        {props.children}
      </div>
    </Aux>
  );
};

export default modal;