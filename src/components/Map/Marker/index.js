import React from "react";
import PropTypes from "prop-types";

import MarkerStyled from "./MarkerStyled";
import MarkerInGroupStyled from "./MarkerInGroupStyled";
import Spy from "../Spy";
import VehicleIcons from "assets/delivery-truck.png";
import { withStyles } from "@material-ui/core/styles";
import { Box, Button, Typography, Zoom } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #ed6929",
  },
}))(Tooltip);

class Marker extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    inGroup: false,
  };

  render() {
    return (
      <div>
        {this.props.inGroup ? (
          <MarkerInGroupStyled>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Driver Info</Typography>
                  <em>{"100KM"}</em> <b>{"some"}</b> <u>{"amazing content"}</u>.{" "}
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <img src={VehicleIcons} width={60} alt="" />
            </HtmlTooltip>
          </MarkerInGroupStyled>
        ) : (
          <MarkerStyled>
            <HtmlTooltip
              title={
                <React.Fragment>
                  <Typography color="inherit">Driver Info</Typography>
                  <em>{"100KM"}</em> <b>{"some"}</b> <u>{"amazing content"}</u>.{" "}
                  {"It's very engaging. Right?"}
                </React.Fragment>
              }
            >
              <img src={VehicleIcons} width={60} alt="" />
            </HtmlTooltip>
          </MarkerStyled>
        )}
      </div>
    );
  }
}

Marker.propTypes = {
  inGroup: PropTypes.bool,
};

export default Marker;
