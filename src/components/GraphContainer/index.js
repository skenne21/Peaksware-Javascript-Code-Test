import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { VictoryBar, VictoryChart,  VictoryTheme } from 'victory';

const GraphContainer = () => {
  const data = [
    {time: 1, power: 13000},
    {time: 2, power: 16500},
    {time: 3, power: 14250},
    {time: 4, power: 19000}
  ];

  return (
    <div className='GraphContainer'>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryBar 
          data={data}
          x="time"
          y="power"
        />
      </VictoryChart>
      
    </div>

  )
}

export default GraphContainer;