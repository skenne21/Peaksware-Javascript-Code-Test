import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ controlFunc, value, name }) => {
  return(
    <div>
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