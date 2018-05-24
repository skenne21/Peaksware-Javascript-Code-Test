import React from 'react';
import Button from '../Button/';
import PropTypes from 'prop-types';

const TimeLabels = ({ controlFunc }) => {
  return (
    <div>
      <h2>CLICK TO VIEW BEST EFFORTS</h2>
      <Button
        controlFunc={ controlFunc }
        value={{mill:60000, second:60, onLoad:true}}
        name={'ONE'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:300000, second:300, onLoad:true}}
        name={'FIVE'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:600000 , second:600, onLoad:true}}
        name={'TEN'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:900000 , second:900, onLoad:true}}
        name={'FIFTHTEEN'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:1200000 , second:1200, onLoad:true}}
        name={'TWENTY'}
      />
    </div>
  )
}

TimeLabels.propTypes = {
  controlFunc: PropTypes.func
};

export default TimeLabels;