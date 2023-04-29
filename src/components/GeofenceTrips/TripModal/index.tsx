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
import React, { useEffect, useState } from "react";
// import Marker from "components/Map/Marker";
import { LoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import RoomIcon from '@mui/icons-material/Room';

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
  const [validPathState, setValidPathState] = useState<any>([]);
  const [corruptPathState, setCorruptPathState] = useState<any>([]);

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
    const { gps_cordinates } = tripPath || {};
    const pathArray = [];
    const testPathArray = [];
    if (Array.isArray(gps_cordinates)) {
      for (let i = 0; i < gps_cordinates.length; i++) {
        pathArray.push(new google.maps.LatLng(Number(gps_cordinates[i][0]), Number(gps_cordinates[i][1])))
        testPathArray.push({
          lat: Number(gps_cordinates[i][0]),
          lng: Number(gps_cordinates[i][1])
        });
      }
    }
    const directionsService = new (
      window as any
    ).google.maps.DirectionsService();
    var polylineOptionsActual = new google.maps.Polyline({
      path: pathArray,
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
    polylineOptionsActual.setMap(map);
    new google.maps.Marker({
      position: origin,
      map,
      label: { color: '#ffffff', fontWeight: 'bold', fontSize: '14px', text: 'A' }
    });
    new google.maps.Marker({
      position: destination,
      map,
      label: { color: '#ffffff', fontWeight: 'bold', fontSize: '14px', text: 'B' }
    });
    // directionsService.route({
    //   origin: origin,
    //   destination: destination,
    //   travelMode: (window as any).google.maps.TravelMode.DRIVING,
    //   waypoints: tripPath?.gps_cordinate || [],
    // }, (result: any, status: any) => {
    //   if (status === (window as any).google.maps.DirectionsStatus.OK) {
    //     directionsRenderer.setDirections(result);
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });
  };

  useEffect(() => {
    const { gps_cordinates } = tripPath || {},
      { valid_data, corrupt_path } = gps_cordinates || {};
    if (tripPath) {
      if (Array.isArray(valid_data)) {
        const validPathArray: any = [];
        if (Array.isArray(valid_data)) {
          for (let i = 0; i < valid_data.length; i++) {
            validPathArray.push({
              lat: Number(valid_data[i][0]),
              lng: Number(valid_data[i][1])
            });
          }
        }
        setValidPathState(validPathArray);
      }
      if (Array.isArray(corrupt_path)) {
        const corruptPathArray: any = [];
        for (let i = 0; i < corrupt_path.length; i++) {
          if (Array.isArray(corrupt_path[i]) && corrupt_path[i].length > 0) {
            const pathArray = [];
            for (let j = 0; j < corrupt_path[i].length; j++) {
              pathArray.push({
                lat: Number(corrupt_path[i][j][0]),
                lng: Number(corrupt_path[i][j][1])
              });
            }
            corruptPathArray.push(pathArray);
          }
        }
        setCorruptPathState(corruptPathArray);
      }
    }
  }, [tripPath]);

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
              Geofence Trip Details{" "}
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
                    {/* <GoogleMapReact
                      key={new Date().getTime()}
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
                        getMapRoute(map, maps);
                      }}
                    >
                    </GoogleMapReact>
 */}

                    {/* <LoadScript
                      googleMapsApiKey={process.env.REACT_APP_MAP_KEY || ""}
                    > */}
                    <GoogleMap
                      options={{
                        center: {
                          lat: Number(geofenceDetails?.start_latitude),
                          lng: Number(geofenceDetails?.start_longitude),
                        },
                        streetViewControl: true,
                        mapTypeControl: true,
                        zoom: 10,
                      }}
                      mapContainerStyle={{
                        height: "300px"
                      }}
                      onLoad={() => { console.log("*********MAP LOADED SUCCESSFULLy.***********") }}
                    >
                      {
                        // ...Your map components
                      }
                      <Marker
                        position={{
                          lat: Number(geofenceDetails?.start_latitude),
                          lng: Number(geofenceDetails?.start_longitude)
                        }}
                        // icon={{
                        //   path: google.maps.SymbolPath.CIRCLE,
                        //   scale: 7,
                        // }}
                        title={geofenceDetails?.start_geofence}
                        label={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px', text: 'A' }}
                      />
                      <Marker
                        position={{
                          lat: Number(geofenceDetails?.end_latitude),
                          lng: Number(geofenceDetails?.end_longitude)
                        }}
                        // icon={{
                        //   // path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
                        //   icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        //   fillColor: "yellow",
                        //   fillOpacity: 1,
                        //   strokeColor: '#000',
                        //   strokeWeight: 1,
                        //   scale: 1
                        // }}
                        // icon='https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        title={geofenceDetails?.end_geofence}
                        label={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px', text: 'B' }}
                      />
                      <Polyline
                        path={validPathState}
                        options={{
                          strokeColor: "#54a0de"
                        }}
                      />
                      {
                        Array.isArray(corruptPathState) && corruptPathState.length > 0 &&
                        corruptPathState.map((item, index) => (
                          <React.Fragment key={`courrupt-path-${index}`}>
                            <Polyline
                              path={item}
                              options={{
                                strokeColor: "#ef5350"
                              }}
                            />
                          </React.Fragment>
                        ))
                      }

                    </GoogleMap>
                    {/* </LoadScript> */}
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Box>
        )
        }
      </Modal >
    </Box >
  );
}
