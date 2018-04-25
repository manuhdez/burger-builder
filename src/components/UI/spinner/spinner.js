import React from 'react';
import classes from './spinner.css';

const spinner = () => {
  return (
    <div className={classes.Spinner}>
      <div className={classes.Bounce1} ></div>
      <div className={classes.Bounce2} ></div>
    </div>
  )
}

export default spinner;