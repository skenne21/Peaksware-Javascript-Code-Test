import React from 'react';
import Button from '../Button/';

const TimeLabels = ({ controlFunc }) => {
  return (
    <div>
      <Button
        controlFunc={ controlFunc }
        value={ 60000 }
        name={'ONE'}
      />
      <Button
        controlFunc={ controlFunc }
        value={ 300000 }
        name={'FIVE'}
      />
      <Button
        controlFunc={ controlFunc }
        value={ 600000 }
        name={'TEN'}
      />
      <Button
        controlFunc={ controlFunc }
        value={ 900000 }
        name={'FIFTHTEEN'}
      />
      <Button
        controlFunc={ controlFunc }
        value={ 1200000 }
        name={'TWENTY'}
      />
    </div>
  )
}

export default TimeLabels;