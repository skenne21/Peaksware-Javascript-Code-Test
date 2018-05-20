import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';



class MapContainer extends Component {
  constructor() {
    super();
    this.state = { gps:[
      { lat: 40.01488, lng: -105.131 }, 
      { lat: 40.01503, lng: -105.13099 },
      { lat: 40.01511, lng: -105.13099 },
      { lat: 40.01518, lng: -105.13099 },
      { lat: 40.01525, lng: -105.13099 },
      { lat: 40.01532, lng: -105.13099 },
      { lat: 40.0154,  lng: -105.13098 },
      { lat: 40.01674, lng: -105.13099 }, 
      { lat: 40.01752, lng: -105.131 },
      { lat: 40.01897, lng: -105.13098 },
      { lat: 40.02222, lng: -105.13098 }
    ]};
  }

  componentDidMount() {
    this.loadMap(); 
  }

  loadMap() {
    if (this.props && this.props.google) { 
      const { google } = this.props;
      const maps = google.maps; 
      const mapRef = this.refs.map; 
      const node = ReactDOM.findDOMNode(mapRef); 
      const mapCoordinates = {
        center: { lat: 40.01488, lng: -105.131  }, 
        zoom: 11, 
        mapTypeId: 'roadmap'
      };

      const polgon = new google.maps.Polygon({
        paths: this.state.gps,
        // draggable: true, // turn off if it gets annoying
        // editable: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        // fillColor: '#FF0000',
        fillOpacity: 0.35
      });

      const mapConfig = Object.assign({}, mapCoordinates);
      this.map = new maps.Map(node, mapConfig);
      polgon.setMap(this.map);
    }
  }

  render() {
    const style = { 
      width: '90vw', 
      height: '75vh' 
    };

    return ( 
      <div ref="map" style={style}>
        loading map...
      </div>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object
};

export default MapContainer;