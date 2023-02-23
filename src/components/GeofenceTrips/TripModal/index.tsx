import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  styled,
  Typography,
} from "@mui/material";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth, monitor, transport } from "constants/RouteMiddlePath";
import { getDateTime, getDuration } from "utils/calenderUtils";
import { Player } from "video-react";
import { IonAvatar } from "@ionic/react";
import GoogleMapReact from "google-map-react";
import { latLongToPlace } from "utils/helpers";
import { useEffect, useState } from "react";
import Marker from "components/Map/Marker";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #261F5A",
  boxShadow: 24,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4, 2, 2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
  alertHead: {
    display: "flex",
    justifyContent: "center",
  },
}));

interface ITripModalProps {
  open: boolean;
  handleClose: () => void;
  geofenceDetails: any;
  id?: any;
}

export function TripModal(props: ITripModalProps) {
  const { open, handleClose, id, geofenceDetails } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");

  // const { data: trip, isLoading } = useQuery(["trip_modal_details", id], () => {
  //   if (id) {
  //     return getTripDetails(String(id));
  //   }
  // });

  // async function getTripDetails(id: string) {
  //   return (await client.get(`${monitor}/trips/${id}/`)).data;
  // }

  // const { data: startlocation } = useQuery(["start_location", trip], () => {
  //   if (trip?.start_latitude && trip?.start_longitude) {
  //     return latLongToPlace(trip.start_latitude, trip.start_longitude, false)
  //   }
  // })
  // const { data: endlocation } = useQuery(["end_location", trip], () => {
  //   if (trip?.end_latitude && trip?.end_longitude) {
  //     return latLongToPlace(trip.end_latitude, trip.end_longitude, false)
  //   }
  // });
  const [count, setCount] = useState(0);
  const { data: tripPath, isLoading } = useQuery(["trip_path", geofenceDetails], () => {
    if (geofenceDetails?.id) {
      return getTripPath(geofenceDetails?.id);
    }
  });

  async function getTripPath(id: string) {
    return (await client.get(`${monitor}/geofence-trips/${id}/path/`)).data;
  }

  const getMapRoute = (map: any, maps: any) => {
    const directionsService = new (
      window as any
    ).google.maps.DirectionsService();
    var polylineOptionsActual = new google.maps.Polyline({
      strokeColor: '#54a0de',
    });
    const directionsRenderer = new (
      window as any
    ).google.maps.DirectionsRenderer({ polylineOptions: polylineOptionsActual });
    directionsRenderer.setMap(map);
    const origin = {
      lat: Number(geofenceDetails?.start_latitude),
      lng: Number(geofenceDetails?.start_longitude),
    };
    const destination = {
      lat: Number(geofenceDetails.end_latitude),
      lng: Number(geofenceDetails.end_longitude),
    };
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: (window as any).google.maps.TravelMode.DRIVING,
      waypoints: tripPath?.gps_cordinate || [],
    }, (result: any, status: any) => {
      if (status === (window as any).google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              className={classes.alertHead}
              variant="h6"
              component="h2"
            >
              Trip Details{" "}
              <i onClick={handleClose}>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.9" filter="url(#filter0_d_2762_100820)">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#fff"
                      stroke-linecap="square"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2762_100820"
                      x="-4"
                      y="-2"
                      width="32"
                      height="32"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2762_100820"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2762_100820"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </i>
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 6, sm: 8, md: 12 }}
              style={{ marginTop: 24 }}
            >
              <Grid xs={12} sm={12} md={12} style={{ paddingLeft: 24 }}>
                <Item elevation={0}>
                  <Grid container>
                    <Grid xs={12} sm={12} md={12} style={{ paddingLeft: 24 }}>
                      <ul className={classes.alertList}>
                        <li>
                          <span>Start Geofence: {geofenceDetails?.start_geofence}</span>
                        </li>
                        <li>
                          <span>End Geofence: {geofenceDetails?.end_geofence}</span>
                        </li>
                        <li>
                          <span>Distance: {geofenceDetails?.distance} km</span>
                        </li>
                        <li>
                          <span>
                            Duration: {geofenceDetails?.duration} hrs
                          </span>
                        </li>
                      </ul>
                    </Grid>
                  </Grid>
                  <Box className="livemap">
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: `${process.env.REACT_APP_MAP_KEY}`,
                      }}
                      style={{ height: `300px` }}
                      defaultZoom={10}
                      resetBoundsOnResize={true}
                      defaultCenter={{
                        lat: Number(geofenceDetails?.start_latitude),
                        lng: Number(geofenceDetails?.start_longitude),
                      }}
                      yesIWantToUseGoogleMapApiInternals={true}
                      onGoogleApiLoaded={({ map, maps }) => {
                        // renderMarkers(map, maps);
                        getMapRoute(map, maps);
                      }}
                    >
                      {/* <Marker
                        key={1}
                        lat={geofenceDetails.start_latitude}
                        lng={geofenceDetails.start_longitude}
                      /> */}
                    </GoogleMapReact>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Box>
        )}
      </Modal>
    </Box>
  );
}
