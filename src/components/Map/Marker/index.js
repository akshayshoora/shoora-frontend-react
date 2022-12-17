import React from 'react';
import PropTypes from 'prop-types';

import MarkerStyled from './MarkerStyled';
import MarkerInGroupStyled from './MarkerInGroupStyled';
import Spy from '../Spy';
import VehicleIcons from 'assets/vehicle.png';

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  render() {
    return (
      <div > 
        {this.props.inGroup
          ? <MarkerInGroupStyled>
             <img src={VehicleIcons} height={32} width={32} alt="" />
            </MarkerInGroupStyled>
          : <MarkerStyled>
              <img src={VehicleIcons} height={32} width={32} alt="" />
            </MarkerStyled>}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool,
};

export default Marker;
