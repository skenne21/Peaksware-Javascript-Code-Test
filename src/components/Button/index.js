import React from 'react';

const Button = ({ controlFunc, value }) => {
  return(
    <div>
      <button
        onClick={(event) => controlFunc(value)}
      >
        { value }
      </button>
    </div>
  )

}

export default Button;