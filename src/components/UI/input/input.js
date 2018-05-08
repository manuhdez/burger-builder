import React from 'react';
import classes from './input.css';

const input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
      break;
    case ('select'):
      inputElement = (
        <select className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}>
          {
            props.elementConfig.options.map( option => {
              return <option key={option.value} value={option.value}>{option.displayValue}</option>
            })
          }
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}/>
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>Please enter a valid value</p>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label} >{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
}

export default input;