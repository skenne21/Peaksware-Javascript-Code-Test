import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import { VictoryBar, VictoryChart,  VictoryTheme } from 'victory';

const GraphContainer = ({ bestPerformance }) => {
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
        // style={{ parent: { width: "100%" },  margin: 'auto'}}
      >
        <VictoryBar 
          data={data}
          x="time"
          y="power"
          // size={5}
          // width={"100%"}
        />
      </VictoryChart>
      
    </div>

  )
}

export default GraphContainer;