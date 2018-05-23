import React, { Component } from 'react';
import './App.css';
import  { 
  spiltIntoTwentyMins,
  findBest,
  timeSegments 
} from '../../cleaners/workoutDataCleaner';
import MapContainer from '../MapContainer/';
import GraphContainer from '../GraphContainer/';
import { GoogleApiWrapper } from 'google-maps-react';
import { googleMapApiKey } from '../../apiKey.js';
import PropTypes from 'prop-types';
const  workoutData = require('../../cleaners/workout-data.json');


class App extends Component {
  constructor() {
    super();
    this.state = {
      topPerformance: []
    }
  }

 getData = () => {
    const segments = spiltIntoTwentyMins(workoutData.samples)
    const topPerformance = findBest(timeSegments);
    this.setState({ topPerformance })  
  }

  componentDidMount () {
    this.getData()

  }

  render() {
    const { bestPerformance } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Fitness Tracker</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MapContainer 
          google={ this.props.google }
          topPerformance={ topPerformance }
        />
        <GraphContainer
          topPerformance={ topPerformance }
        />
      </div>
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
  bestPerformance: PropTypes.array
};

export default  GoogleApiWrapper({ apiKey: googleMapApiKey})(App) ;
