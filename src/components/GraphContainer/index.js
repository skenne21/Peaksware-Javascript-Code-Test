import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import { VictoryBar, VictoryChart,  VictoryTheme, VictoryLabel } from 'victory';

const GraphContainer = ({ topPerformance, output }) => {
  return (
    <div className='GraphContainer'>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryBar 
          data={output}
          x="time"
          y="power"
        />
      </VictoryChart> 
    </div>
  );
}

export default GraphContainer;