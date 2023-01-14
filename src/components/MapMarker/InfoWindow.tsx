import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import useStyles from "./style";
import VehicleIcons from "assets/cargo-truck.png";
import { getDateDisplayFormat, getDateTime } from "utils/calenderUtils";

enum Status {
    Moving = 'moving',
    Idle = 'idle',
    Stop = 'stop',
}
// class Marker extends React.PureComponent {
interface IMarkerprops {
    lat: number;
    lng: number;
    current_location: any;
    vehicleInfo?: any;
}

function Marker(props: any) {
    // eslint-disable-line react/prefer-stateless-function
    // static defaultProps = {
    //   inGroup: false,
    // };
    const { vehicleInfo, address } = props;
    const classes = useStyles();

    return (
        <Box className={classes.vehicleBox}>
            <Box className={classes.vehicleModal}>
                <Box className={classes.vehicleModalClose}>
                </Box>
                <Box className={classes.vehicleTrip}>
                    <h2>Trip Details:</h2>
                    <Box className="fw-bold" sx={{ mb: 1.2 }}>
                        <Box component="span" className={((vehicleInfo.status) === Status.Moving) ? 'status-moving' : 'status-danger'}> {vehicleInfo.status}: {"n/a"} minutes</Box>
                        <Box component="span"> | </Box>
                        <Box component="span" className="label-light">Today: </Box>
                        <Box component="span" className=" label-light">{'n/a'} km</Box>
                    </Box>
                    <Box sx={{ mb: 1.2, display: 'flex' }} >
                        <Box component="span" sx={{ mr: 0.5 }} className="fw-bold label-light">Last data received:  </Box>
                        <Box component="span" className="fw-bold label-dark">{getDateTime(vehicleInfo?.last_device_status_timestamp)}</Box>
                    </Box>
                    <Box sx={{ mb: 1.2, display: 'flex' }}>
                        <Box component="span" sx={{ mr: 0.5 }} className="fw-bold label-light">Address: </Box>
                        <Box component="span" sx={{ textAlign: 'justify' }} className="fw-bold label-dark">{address || "n/a"}</Box>
                    </Box>
                    <Box sx={{ mb: 1.2, display: 'flex' }}>
                        <Box component="span" sx={{ mr: 0.5 }} className="fw-bold label-light">Position: </Box>
                        <Box component="span" className="fw-bold  label-dark">{`(${vehicleInfo?.current_location?.latitude}, ${vehicleInfo?.current_location?.longitude})`}</Box>

                    </Box>
                    <Box sx={{ mb: 1.2, display: 'flex' }}>
                        <Box component="span" sx={{ mr: 0.5 }} className="fw-bold label-light">Trip: </Box>
                        <Box component="span" className="fw-bold  label-dark">{vehicleInfo?.driver || "n/a"}</Box>
                    </Box>
                    <Box sx={{ mb: 1.2, display: 'flex' }}>
                        <Box component="span" sx={{ mr: 0.5 }} className="fw-bold label-light">Driver: </Box>
                        <Box component="span" className="fw-bold label-dark">{vehicleInfo?.driver || "n/a"}</Box>
                    </Box>
                    <Box sx={{ mb: 1.2, display: 'flex' }}>
                        <Box component="span" sx={{ mr: 0.5 }} className="fw-bold label-light">Vehicle: </Box>
                        <Box component="span" className="fw-bold label-dark">{vehicleInfo?.vin || "n/a"}</Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}

// Marker.propTypes = {
//   inGroup: PropTypes.bool,
// };

export default Marker;
