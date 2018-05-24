import React from 'react';
import Button from '../Button/';

const TimeLabels = ({ controlFunc }) => {
  return (
    <div>
      <Button
        controlFunc={ controlFunc }
        value={{mill:60000, second:60}}
        name={'ONE'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:300000, second:300}}
        name={'FIVE'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:600000 , second:600}}
        name={'TEN'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:900000 , second:900}}
        name={'FIFTHTEEN'}
      />
      <Button
        controlFunc={ controlFunc }
        value={{mill:1200000 , second:1200}}
        name={'TWENTY'}
      />
    </div>
  )
}

export default TimeLabels;