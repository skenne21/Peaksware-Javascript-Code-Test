import React, { Component } from 'react';
import './App.css';
import  { 
  spiltIntoTwentyMins,
  findBest,
  timeSegments,
  gpsRoute,
  performanceData
} from '../../cleaners/workoutDataCleaner';
import MapContainer from '../MapContainer/';
import GraphContainer from '../GraphContainer/';
import { GoogleApiWrapper } from 'google-maps-react';
import { googleMapApiKey } from '../../apiKey.js';
import PropTypes from 'prop-types';
import  TimeLabels from '../TimeLabels/';
const  workoutData = require('../../cleaners/workout-data.json');


class App extends Component {
  constructor() {
    super();
    this.state = {
      topPerformance: [],
      gps: [],
      output: [],
      data: workoutData.samples
    }
  }

 getData = () => {
    const { data } = this.state
    const exerciseData = data.slice(0, data.length)
    const segments = spiltIntoTwentyMins(exerciseData, 1200000)
    const gps = gpsRoute(workoutData.samples);
    const topPerformance = findBest(timeSegments);
    const output = performanceData(topPerformance)
    this.setState({ 
      topPerformance, 
      gps,
      output 
    });
  }


  getTimeParams = (timeParams) => {
    const { data } = this.state
    const exerciseData = data.slice(0, data.length)
    console.log(exerciseData)
    const segments = spiltIntoTwentyMins(exerciseData, timeParams)
    // console.log(timeSegments)
    // const topPerformance = findBest(timeSegments);
    // console.log(timeParams)
  }

  componentDidMount () {
    this.getData()
  }

  render() {
    const { topPerformance, gps, output } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Fitness Tracker</h1>
        </header>
        <MapContainer 
          google={ this.props.google }
          gps={ gps }
        />
        <GraphContainer
          topPerformance={ topPerformance }
          output={ output } 
        />
        <TimeLabels 
          controlFunc={ this.getTimeParams }/>
      </div>
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
  topPerformance: PropTypes.array
};

export default  GoogleApiWrapper({ apiKey: googleMapApiKey})(App) ;
