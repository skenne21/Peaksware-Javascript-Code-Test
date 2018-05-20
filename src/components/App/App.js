import React, { Component } from 'react';
import './App.css';
// import  { covertTime } from './cleaner';
import MapContainer from '../MapContainer/';
import GraphContainer from '../GraphContainer/';
import { GoogleApiWrapper } from 'google-maps-react';
import { googleMapApiKey } from '../../apiKey.js';
import PropTypes from 'prop-types';
const  workoutData = require('../../cleaners/workout-data.json');





class App extends Component {
  componentDidMount () {
    // const data = covertTime(workoutData.samples, 20)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Fitness Tracker</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <MapContainer 
          google={this.props.google}
        />
        <GraphContainer />
      </div>
    );
  }
}

App.propTypes = {
  google: PropTypes.object,
};

export default  GoogleApiWrapper({ apiKey: googleMapApiKey})(App) ;
