import React, { Component } from 'react';
import './App.css';
import AnalysisData from '../../cleaners/workoutDataCleaner';
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
    const exerciseData = data.slice(0, data.length);
    const analysisData = new AnalysisData(1200000, 1200);
    const segments = analysisData.spiltIntoTwentyMins(exerciseData);
    const gps = analysisData.gpsRoute(data);
    const topPerformance = analysisData.findBest(analysisData.timeSegments);
    const output = analysisData.performanceData(topPerformance)
    this.resetState(topPerformance, gps, output)
  }

  getTimeParams = (timeParams) => {
    const { data } = this.state;
    const exerciseData = data.slice(0, data.length);
    const analysisData = new AnalysisData(timeParams.mill, timeParams.second);
    const segments = analysisData.spiltIntoTwentyMins(exerciseData);
    const topPerformance = analysisData.findBest(analysisData.timeSegments);
    const output = analysisData.performanceData(topPerformance);
    const gps = analysisData.gpsRoute(topPerformance);
    this.resetState(topPerformance, gps, output)
  }

  resetState(topPerformance, gps, output) {
    this.setState({ 
      topPerformance, 
      gps,
      output 
    });
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
