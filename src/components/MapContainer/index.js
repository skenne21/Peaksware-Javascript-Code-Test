import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

class MapContainer extends Component {
  componentDidMount() {
    this.loadMap(); 
  }

  componentDidUpdate() {
    this.loadMap()
  }

  loadMap() {
    if (this.props && this.props.google) { 
      const { google, gps } = this.props;
      const maps = google.maps; 
      const mapRef = this.refs.map; 
      const node = ReactDOM.findDOMNode(mapRef); 
      const mapCoordinates = {
        center: { lat: 40.01488, lng: -105.131  }, 
        zoom: 12, 
        mapTypeId: 'roadmap'
      };

      const gpsCorrdinates = new google.maps.Polyline({
        path: gps,
        fillOpacity: 0.35,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      const mapConfig = Object.assign({}, mapCoordinates);
      this.map = new maps.Map(node, mapConfig);
      gpsCorrdinates.setMap(this.map);
    }
  }

  render() {
    console.log(this.props.gps)
    const style = { 
      width: '80vw', 
      height: '65vh', 
      margin: '1em auto' 
    };
    
    return ( 
      <div ref="map" className='MapContainer' style={style}>
        loading map...
      </div>
    );
  }
}

MapContainer.propTypes = {
  google: PropTypes.object,
  gps: PropTypes.array
};

export default MapContainer;