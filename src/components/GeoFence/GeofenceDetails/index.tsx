import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth, transport } from "constants/RouteMiddlePath";

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
      </Box>
    </Box>
  );
}
