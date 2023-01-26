import { Box, Button, IconButton, Typography, Grid } from "@mui/material";
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
import { vehiclRCInfo } from "./helper";

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
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          style={{ marginTop: 24 }}
        >
          <Grid xs={12} sm={12} lg={4} style={{ paddingLeft: 24 }}>
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
              <Box className={classes.bodyInfo}>{getDateTime(vehicle.created_at)}</Box>
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
          </Grid>
          <Grid xs={12} sm={12} lg={8} style={{ paddingLeft: 16 }}>
            <Box component="form">
              <Box className={classes.fieldSetContainer} component="fieldset">
                <Box sx={{ fontWeight: "bold" }} component="legend">VEHICLE RC DETAILS</Box>
                <Box>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 3 }}
                    columns={{ xs: 12, sm: 12 }}
                    style={{ marginLeft: 0, padding: "32px 24px" }}
                  >
                    {
                      vehiclRCInfo.map(item => (
                        <Grid sx={{ mb: 2.5 }} key={item.id} container xs={12} sm={6}>
                          <Grid item xs={6}>
                            <Box className={classes.vehicleRCLabel}>{item.labelName} :</Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className={classes.vehicleRCValue}>{vehicle?.rcInfo?.[item.keyName] || "-"}</Box>
                          </Grid>
                        </Grid>
                      ))
                    }

                    {/* <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Owner Name :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Father Name :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Present Address :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Permanent Address :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Vehicle Category :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Vehicle Chasi Number :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Vehicle Engine Number :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>

                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Maker Description :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Maker Model :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Body Type :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Fuel Type :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>
                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Color :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>

                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Color :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>

                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Color :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid>

                    <Grid container sx={{ mb: 2 }} xs={12} sm={6}>
                      <Grid xs={5}>
                        <Box className={classes.vehicleRCLabel}>Color :</Box>
                      </Grid>
                      <Grid xs={7}>
                        <Box className={classes.vehicleRCValue}>{vehicle?.details?.registration_date || "2015-11-18"}</Box>
                      </Grid>
                    </Grid> */}


                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

      </Box>
    </Box>
  );
}
