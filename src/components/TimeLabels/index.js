import React from 'react';
import Button from '../Button/';
import PropTypes from 'prop-types';

const TimeLabels = ({ controlFunc }) => {
  return (
    <div>
      <h2>CLICK TO VIEW BEST EFFORTS</h2>
      <Button
        controlFunc={ controlFunc }
        value={{mill:1200000 , second:1200, onLoad:true}}
        name={'twenty'}
      />
       <Button
        controlFunc={ controlFunc }
        value={{mill:900000 , second:900, onLoad:true}}
        name={'fifteen'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:600000 , second:600, onLoad:true}}
        name={'ten'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:300000, second:300, onLoad:true}}
        name={'five'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:60000, second:60, onLoad:true}}
        name={'one'}
      />
    </div>
  )
}

TimeLabels.propTypes = {
  controlFunc: PropTypes.func
};

export default TimeLabels;