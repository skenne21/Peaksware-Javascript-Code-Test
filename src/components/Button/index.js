import React from 'react';

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

export default Button;