import React from 'react';
import Button from '../Button/';

const TimeLabels = ({ controlFunc }) => {
  return (
    <div>
      <Button
        controlFunc={ controlFunc }
        value={1}
      />
      <Button
        controlFunc={ controlFunc }
        value={5}
      />
      <Button
        controlFunc={ controlFunc }
        value={10}
      />
      <Button
        controlFunc={ controlFunc }
        value={15}
      />
      <Button
        controlFunc={ controlFunc }
        value={20}
      />
    </div>
  )
}

export default TimeLabels;