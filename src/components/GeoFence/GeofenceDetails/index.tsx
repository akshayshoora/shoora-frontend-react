import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth, transport } from "constants/RouteMiddlePath";
import { GeoFenceModal } from "../GeoFenceModal";
import GeoFenceMap from "../GeoFenceMap";

export function GeofenceDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: geofenceData, isLoading } = useQuery(
    ["geofence_details", id],
    () => getGeofenceDetails(String(id))
  );

  async function getGeofenceDetails(id: string) {
    return (await client.get(`${transport}/geofences/${id}/`)).data;
  }
  function GoToBack() {
    navigate(-1);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <Box className={classes.headingWrapper}>
        <Box className={classes.headingContent}>
          <IconButton
            className={classes.headingBackButton}
            size="small"
            onClick={GoToBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography fontSize={24} style={{ textTransform: "capitalize" }}>
            Geofence Details
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bodyContent}>
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          style={{ marginTop: 24 }}
        >
          <Grid xs={12} sm={6} md={6} lg={5} style={{ paddingLeft: 24 }}>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Geofence Name:</Box>
              <Box
                className={classes.bodyInfo}
                style={{ textTransform: "capitalize" }}
              >
                {geofenceData.name}
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Geofence ID:</Box>
              <Box className={classes.bodyInfo}>{geofenceData.id}</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Latitude:</Box>
              <Box className={classes.bodyInfo}>{geofenceData.latitude}</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Longitude:</Box>
              <Box className={classes.bodyInfo}>{geofenceData.longitude}</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Radius</Box>
              <Box className={classes.bodyInfo}>{geofenceData.radius}</Box>
            </Box>
            <Box>
              <GeoFenceModal
                open={true}
                handleClose={() => { }}
                selectedItem={{
                  "id": "4d4e8cd5-5688-4612-8062-64d8820c7bba",
                  "latitude": 28.5355161,
                  "longitude": 77.3910265,
                  "radius": 2000,
                  "organization_id": "b08eaad3-f9ee-44cc-a947-70bc2cd4cb89",
                  "name": "Testing",
                  "address": "G9PR+6C3, Bhangel, Sector - 106, Noida, Uttar Pradesh, India"
                }}
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={6} md={6} lg={7} style={{ paddingLeft: 16 }}>
            <GeoFenceMap
              circleRadius={Number(geofenceData?.radius)}
              center={{ lat: geofenceData.latitude, lng: geofenceData.longitude }}
              polyAxis={() => { }}
              type={"circle"}
              setCenter={() => { }}
              setLat={() => { }}
              setLng={() => { }}
            />
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
}
