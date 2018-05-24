import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const Button = ({ controlFunc, value, name }) => {
  return(
    <div className='Button'>
      <button
        onClick={(event) => controlFunc(value)}
      >
        { name }
      </button>
    </div>
  )
}

Button.propTypes = {
  controlFunc: PropTypes.func,
  value: PropTypes.object,
  name: PropTypes.string
};

export default Button;