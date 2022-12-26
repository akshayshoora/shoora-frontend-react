import React from "react";
import GoogleMapReact from "google-map-react";
import supercluster from "points-cluster";

import Marker from "../Marker";
import ClusterMarker from "../ClusterMarker";

import mapStyles from "./mapStyles.json";
import { markersData, susolvkaCoords } from "../fakeData";

import MapWrapper from "./MapWrapper";

export class GoogleMap extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  MAP = {
    defaultZoom: 8,
    defaultCenter: this.props.list[0],
    options: {
      styles: mapStyles,
      maxZoom: 19,
    },
  };

  state = {
    mapOptions: {
      center: this.MAP.defaultCenter,
      zoom: this.MAP.defaultZoom,
    },
    clusters: [],
  };

  getClusters = () => {
    console.log(this.props.list, "listtt");
    const clusters = supercluster(this.props.list, {
      minZoom: 0,
      maxZoom: 16,
      radius: 60,
    });

    return clusters(this.state.mapOptions);
  };

  createClusters = (props) => {
    this.setState({
      clusters: this.state.mapOptions.bounds
        ? this.getClusters(props).map(({ wx, wy, numPoints, points }) => ({
            lat: wy,
            lng: wx,
            numPoints,
            id: `${numPoints}_${points[0].id}`,
            points,
          }))
        : [],
    });
  };

  handleMapChange = ({ center, zoom, bounds }) => {
    this.setState(
      {
        mapOptions: {
          center,
          zoom,
          bounds,
        },
      },
      () => {
        this.createClusters(this.props);
      }
    );
  };

  render() {
    return (
      <MapWrapper>
        <GoogleMapReact
          style={{ height: `600px` }}
          defaultZoom={this.MAP.defaultZoom}
          defaultCenter={this.MAP.defaultCenter}
          options={this.MAP.options}
          onChange={this.handleMapChange}
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_KEY }}
        >
          {this.state.clusters.map((item) => {
            if (item.numPoints === 1) {
              return (
                <Marker
                  key={item.id}
                  lat={item.points[0].lat}
                  lng={item.points[0].lng}
                />
              );
            }

            return (
              <ClusterMarker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                points={item.points}
              />
            );
          })}
        </GoogleMapReact>
      </MapWrapper>
    );
  }
}

export default GoogleMap;
