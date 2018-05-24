import React, { Component } from 'react';
import './App.css';
import AnalysisData from '../../cleaners/workoutDataCleaner';
import MapContainer from '../MapContainer/';
import GraphContainer from '../GraphContainer/';
import { GoogleApiWrapper } from 'google-maps-react';
import { googleMapApiKey } from '../../apiKey.js';
import PropTypes from 'prop-types';
import TimeLabels from '../TimeLabels/';
const  workoutData = require('../../cleaners/workout-data.json');

class App extends Component {
  constructor() {
    super();
    this.state = {
      topPerformance: [],
      gps: [],
      output: [],
      data: workoutData.samples,
      one: [],
      five: [],
      ten: [],
      fifteen: [],
      twenty: []
    }
  }

  createData = (data, timeParams) => {
    const exerciseData = data.slice(0, data.length);
    const analysisData = new AnalysisData(timeParams.mill, timeParams.second, data);
    const segments = analysisData.spiltIntoTwentyMins(exerciseData);
    return analysisData;
  }

  determineTime = (name, topPerformance) => {
    if (!this.state[name].length) {
      this.setState({ [name]: topPerformance });
    }
  }

  havePerformace = (name, timeParams, analysisData) => {
    if (this.state[name].length) {
      const gps = this.setGPSData(timeParams, analysisData, this.state[name]);
      const output = analysisData.performanceData(this.state[name]);
      this.resetState(this.state[name], gps, output, this.state[name]);
      return true;
    } else {
      return false;
    }
  }

  getData = (timeParams, name) => {
    const { data } = this.state;
    const analysisData = this.createData(data, timeParams);
    const performaceInState = this.havePerformace(name, timeParams, analysisData);
    if (!performaceInState) {
      const topPerformance = analysisData.findBest(analysisData.timeSegments);
      const timeState = this.determineTime(name, topPerformance);
      const gps = this.setGPSData(timeParams, analysisData, topPerformance);
      const output = analysisData.performanceData(topPerformance);
      this.resetState(topPerformance, gps, output, timeState);
    }
  }

  setGPSData = (timeParams, analysisData, topPerformance) => {
    const { onLoad } = timeParams;
    let gps;
    if (timeParams.onLoad) {
      gps = analysisData.gpsRoute(topPerformance);
    } else {
      gps = analysisData.gpsRoute();
    }
    return gps;
  }

  resetState(topPerformance, gps, output) {
    this.setState({ 
      topPerformance, 
      gps,
      output, 
    });
  }

  componentDidMount () {
    this.getData({mill: 1200000, second: 1200}, 'twenty');
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
          controlFunc={ this.getData }/>
      </div>
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
  topPerformance: PropTypes.array,
  gps: PropTypes.array,
  output: PropTypes.array,
  controlFunc: PropTypes.func
};

export default  GoogleApiWrapper({ apiKey: googleMapApiKey })(App);
