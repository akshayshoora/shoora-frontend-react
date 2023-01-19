import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth, transport } from "constants/RouteMiddlePath";
import { getDateTime } from "utils/calenderUtils";
import { getIsShipper } from "utils/localStorage";
import { useEffect } from "react";

export function VehicleDetails() {
  const classes = useStyles();
  const navigate = useNavigate();
  const isShipper: any = getIsShipper();

  const { id } = useParams();


  const { data: vehicle, isLoading } = useQuery(["vehicle_details", id], () =>
    getVehicleDetails(String(id))
  );

  async function getVehicleDetails(id: string) {
    return (await client.get(`${transport}/vehicles/${id}/`)).data;
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
            Vehicle Details
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bodyContent}>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Vehicle Number:</Box>
          <Box className={classes.bodyInfo}>
            {vehicle.vin ? vehicle.vin : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Vehicle Type:</Box>
          <Box
            className={classes.bodyInfo}
            style={{ textTransform: "capitalize" }}
          >
            {vehicle.vehicle_type}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Assets Created On:</Box>
          <Box className={classes.bodyInfo}>{getDateTime(vehicle.last_device_status_timestamp)}</Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Make By:</Box>
          <Box className={classes.bodyInfo}>{vehicle.make}</Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Model:</Box>
          <Box className={classes.bodyInfo}>
            {vehicle.model ? vehicle.model : "-"}
          </Box>
        </Box>
        {(isShipper === "true") && <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Transporter:</Box>
          <Box className={classes.bodyInfo}>
            {vehicle.transporter ? vehicle.transporter : "-"}
          </Box>
        </Box>}
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Capacity:</Box>
          <Box className={classes.bodyInfo}>
            {vehicle.capacity ? vehicle.capacity : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Fuel Type:</Box>
          <Box className={classes.bodyInfo}>
            {vehicle.fuel_type ? vehicle.fuel_type : "-"}
          </Box>
        </Box>

      </Box>
    </Box>
  );
}
