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
import Tooltip from '@mui/material/Tooltip';
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
import { LoadScript, GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { latLongToPlace } from "utils/helpers";
import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';
// import Marker from "components/Map/Marker";

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
  id: string;
}


const AnyReactComponent: any = ({ text }: any) => <div>{text}</div>;

export function TripModal(props: ITripModalProps) {
  const { open, handleClose, id } = props;
  const classes = useStyles();
  const navigate = useNavigate();
  const [startLoc, setStartLoc] = useState("");
  const [endLoc, setEndLoc] = useState("");
  const [validPathState, setValidPathState] = useState<any>([]);
  const [editModeState, setEditModeState] = useState<any>({
    showInput: false,
    inputValue: ""
  });

  const { data: driverList, isLoading: isDriverLoading } = useQuery(
    ["drivers-verify"],
    () => getDrivers(),
    { refetchOnWindowFocus: false }
  );

  async function getDrivers() {
    console.log("Driver api call");
    let getApiUrl = `${transport}/drivers/?page=1&page_size=500`;
    const response = await client.get(getApiUrl);
    return response.data;
  }

  const { data: trip, isLoading } = useQuery(["trip_modal_details", id], () => {
    if (id) {
      return getTripDetails(String(id));
    }
  });

  async function getTripDetails(id: string) {
    return (await client.get(`${monitor}/trips/${id}/`)).data;
  }

  const renderMarkers = (map: any, maps: any) => {
    let marker = new maps.Marker({
      position: {
        lat: Number(trip.end_latitude),
        lng: Number(trip.end_longitude),
      },
      map,
      title: "",
    });
    return marker;
  };

  const { data: startlocation } = useQuery(["start_location", trip], () => {
    if (trip?.start_latitude && trip?.start_longitude) {
      return latLongToPlace(trip.start_latitude, trip.start_longitude, false)
    }
  })
  const { data: endlocation } = useQuery(["end_location", trip], () => {
    if (trip?.end_latitude && trip?.end_longitude) {
      return latLongToPlace(trip.end_latitude, trip.end_longitude, false)
    }
  });
  const [count, setCount] = useState(0);
  const { data: tripPath } = useQuery(["trip_path", trip], () => {
    if (trip?.id) {
      return getTripPath(trip?.id)
    }
  });

  async function getTripPath(id: string) {
    return (await client.get(`${monitor}/trips/${id}/path/`)).data;
  }

  useEffect(() => {
    const { gps_cordinates } = tripPath || {};
    if (tripPath) {
      if (Array.isArray(gps_cordinates)) {
        const validPathArray: any = [];
        if (Array.isArray(gps_cordinates)) {
          for (let i = 0; i < gps_cordinates.length; i++) {
            validPathArray.push({
              lat: Number(gps_cordinates[i][0]),
              lng: Number(gps_cordinates[i][1])
            });
          }
        }
        setValidPathState(validPathArray);
      }
    }
  }, [tripPath]);

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
      lat: Number(trip.start_latitude),
      lng: Number(trip.start_longitude),
    };
    const destination = {
      lat: Number(trip.end_latitude),
      lng: Number(trip.end_longitude),
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
    //   // // optimizeWaypoints: true,
    //   // waypoints: pathArray,
    // }, (result: any, status: any) => {
    //   if (status === (window as any).google.maps.DirectionsStatus.OK) {
    //     directionsRenderer.setDirections(result);
    //   } else {
    //     console.error(`error fetching directions ${result}`);
    //   }
    // });
  };

  function verifyDriverHndlr(event: any) {
    const driverName = event.target.getAttribute("data-name");
    if (driverName) {
      setEditModeState({
        showInput: true,
        inputValue: driverName
      })
    }
  }

  function onChangeDriverNameHndlr(event: any) {
    const { name, value } = event.target;
    setEditModeState((prevState: any) => ({
      ...prevState,
      inputValue: value
    }))
  }

  function cancelVerifyHndlr() {
    setEditModeState((prevState: any) => ({
      ...prevState,
      showInput: false,
    }))
  }
  function saveVerifyHndlr() {
    setEditModeState((prevState: any) => ({
      ...prevState,
      showInput: false,
    }))
  }

  function onSelectVehicleHndlr(event: any, selectedValue: any) {
    const { id: driver_id, name } = selectedValue || {};
    console.log({ selectedValue });
    if (name) {
      setEditModeState((prevState: any) => ({
        ...prevState,
        inputValue: name,
      }))
    }
  }

  const { results: driverResults } = driverList || {};
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
                    <Grid xs={2} sm={6} md={6} style={{ paddingLeft: 24 }}>
                      <Box className={classes.avtarDriveInfo}>
                        <IonAvatar className={classes.avtarIcon}>
                          <img
                            alt="avtar icon"
                            src="https://ionicframework.com/docs/img/demos/avatar.svg"
                          />
                        </IonAvatar>
                        <ul className={classes.alertListInfo} style={{ width: "100%" }}>
                          <li>
                            <div style={{
                              display: "flex",
                              alignItems: editModeState.showInput ? "flex-start" : "center",
                              width: "100%"
                            }}>
                              <span style={{ whiteSpace: "nowrap", marginRight: "4px" }}>Drive dr Name:</span>


                              {!editModeState.showInput &&
                                <span
                                  style={{ display: "flex", alignItems: "center" }}
                                >{editModeState.inputValue || trip?.driver?.name || "-"}
                                  <Tooltip title="Edit Name">
                                    <EditOutlinedIcon
                                      onClick={verifyDriverHndlr}
                                      data-name={trip?.driver?.name || "-"}
                                      style={{ fontSize: "16px", cursor: "pointer", marginLeft: "4px" }} />
                                  </Tooltip>
                                  <Tooltip title="Verify">
                                    <CheckCircleIcon
                                      onClick={saveVerifyHndlr}
                                      style={{
                                        fontSize: "16px", cursor: "pointer", marginLeft: "4px",
                                        color: "#4caf50"
                                      }} />
                                  </Tooltip>
                                </span>
                              }

                              {editModeState.showInput && <Box component="div" style={{ width: "100%" }}>
                                {/* <TextField
                                  id="emails"
                                  name="emails"
                                  type="text"
                                  sx={{ width: "100%" }}
                                  size="small"
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  value={editModeState.inputValue}
                                  onChange={onChangeDriverNameHndlr}
                                /> */}
                                <Autocomplete
                                  size="small"
                                  id="driver_id"
                                  options={driverResults}
                                  loading={isDriverLoading}
                                  onChange={onSelectVehicleHndlr}
                                  getOptionLabel={(option: any) => option.name}
                                  fullWidth={true}
                                  renderOption={(props: any, option: any) => (
                                    <Box component="li" {...props} key={option.id}>
                                      {option.name} - {option.vin}
                                    </Box>
                                  )}
                                  renderInput={(params: any) => <TextField
                                    fullWidth
                                    className="test"
                                    name="driver_id"
                                    InputProps={{
                                      className: classes.width100
                                    }}
                                    inputProps={{
                                      className: classes.width100
                                    }}
                                    placeholder={"Search by driver name"} {...params} />}


                                />
                                <div style={{ display: "flex", marginTop: "8px" }}>
                                  <Tooltip title="Verify Name">
                                    <Button variant="outlined"
                                      style={{
                                        fontSize: "12px", cursor: "pointer", marginLeft: "4px",
                                        color: "#4caf50", padding: 0,
                                        borderColor: "#4caf50"
                                      }}
                                      onClick={saveVerifyHndlr}
                                    >Verify</Button>
                                    {/* <SaveIcon
                                      onClick={verifyDriverHndlr}
                                      data-name={trip?.driver?.name || "-"}
                                      style={{
                                        fontSize: "16px", cursor: "pointer", marginLeft: "4px",
                                        color: "#4caf50"
                                      }} /> */}
                                  </Tooltip>
                                  <Tooltip title="Cancel">
                                    <Button variant="outlined"
                                      style={{
                                        fontSize: "12px", cursor: "pointer", marginLeft: "4px",
                                        color: "#d32f2f", padding: 0,
                                        borderColor: "#d32f2f"
                                      }}
                                      onClick={cancelVerifyHndlr}
                                    >Cancel</Button>
                                    {/* <CancelIcon
                                      onClick={verifyDriverHndlr}
                                      data-name={trip?.driver?.name || "-"}
                                      style={{
                                        fontSize: "16px", cursor: "pointer", marginLeft: "4px",
                                        color: "#d32f2f"

                                      }} /> */}
                                  </Tooltip>
                                </div>

                              </Box>}
                            </div>

                          </li>
                          <li>
                            <span>
                              Contact Details:{" "}
                              {trip?.driver?.phone_number || "-"}
                            </span>
                          </li>
                          <li>
                            <span>
                              Licence No:{" "}
                              {trip?.driver?.driving_license_number || "-"}
                            </span>
                          </li>
                        </ul>
                      </Box>
                    </Grid>
                    <Grid xs={2} sm={6} md={6} style={{ paddingLeft: 24 }}>
                      <ul className={classes.alertList}>
                        <li>
                          <span>Start Location: {startlocation}</span>
                        </li>
                        <li>
                          <span>End Location: {endlocation}</span>
                        </li>
                        <li>
                          <span>Distance: {trip.distance} km</span>
                        </li>
                        <li>
                          <span>
                            Duration: {getDuration(trip.duration / 60)}
                          </span>
                        </li>
                      </ul>
                    </Grid>
                  </Grid>
                  {trip?.is_corrupt && <Box sx={{ fontSize: "14px", color: "#ef5350" }}>
                    Note: Some of the data points are not proper.
                  </Box>}
                  <Box className="livemap">
                    <GoogleMap
                      options={{
                        center: {
                          lat: Number(trip?.start_latitude),
                          lng: Number(trip?.start_longitude),
                        },
                        streetViewControl: true,
                        mapTypeControl: true,
                        zoom: 10,
                        maxZoom: 16
                      }}
                      mapContainerStyle={{
                        height: "300px"
                      }}
                    >
                      {
                        // ...Your map components
                      }
                      <Marker
                        position={{
                          lat: Number(trip?.start_latitude),
                          lng: Number(trip?.start_longitude)
                        }}
                        // icon={{
                        //   path: google.maps.SymbolPath.CIRCLE,
                        //   scale: 7,
                        // }}
                        title={trip?.start_geofence}
                        label={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px', text: 'A' }}
                      />
                      <Marker
                        position={{
                          lat: Number(trip?.end_latitude),
                          lng: Number(trip?.end_longitude)
                        }}
                        title={trip?.end_geofence}
                        label={{ color: '#ffffff', fontWeight: 'bold', fontSize: '14px', text: 'B' }}
                      />
                      <Polyline
                        path={validPathState}
                        options={{
                          strokeColor: "#54a0de"
                        }}
                      />
                    </GoogleMap>
                    {/* <GoogleMapReact
                      key={new Date().getTime()}
                      bootstrapURLKeys={{
                        key: `${process.env.REACT_APP_MAP_KEY}`,
                      }}
                      style={{ height: `300px` }}
                      defaultZoom={10}
                      resetBoundsOnResize={true}
                      // 37.4419, -122.1419
                      defaultCenter={{
                        lat: Number(trip?.start_latitude),
                        lng: Number(trip?.start_longitude),
                      }}
                      options={{ streetViewControl: true, mapTypeControl: true }}
                      yesIWantToUseGoogleMapApiInternals={false}
                      onGoogleApiLoaded={({ map, maps }) => {
                        // renderMarkers(map, maps);
                        getMapRoute(map, maps);
                      }}
                    >
                      <Marker
                        key={1}
                        lat={trip.start_latitude}
                        lng={trip.start_longitude}
                      /> 
                  <AnyReactComponent
                        lat={22.974601}
                        lng={72.56228}
                        text="My Marker"
                      /> 
                  </GoogleMapReact> */}
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
