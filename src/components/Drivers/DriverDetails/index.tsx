import { Box, Button, IconButton, Typography, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { transport } from "constants/RouteMiddlePath";
import { driverLicenseInfo } from "./helper";
import DrivingHistory from "./DriverHistory";

export function DriverDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: driverDetails, isLoading } = useQuery(
    ["driverDetail", id],
    () => getDriverDetails(String(id))
  );

  async function getDriverDetails(id: string) {
    return (await client.get(`${transport}/drivers/${id}/`)).data;
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
            Driver Details
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            onClick={() =>
              navigate(`/${AppPaths.DRIVERS}/${SubPaths.EDIT}/${id}`)
            }
          >
            Edit Driver Details
          </Button>
        </Box>
      </Box>
      <Box className={classes.bodyContent}>
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          style={{ marginTop: 24 }}
        >
          <Grid xs={12} sm={12} lg={5} style={{ paddingLeft: 24 }}>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Name:</Box>
              <Box
                className={classes.bodyInfo}
                style={{ textTransform: "capitalize" }}
              >
                {driverDetails.name}
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Phone Number:</Box>
              <Box className={classes.bodyInfo}>{driverDetails.phone_number}</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Passport Number:</Box>
              <Box className={classes.bodyInfo}>
                {driverDetails.passport_number}
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Passport Validity:</Box>
              <Box className={classes.bodyInfo}>
                {driverDetails.passport_validity}
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Driving License Number:</Box>
              <Box className={classes.bodyInfo}>
                {driverDetails.driving_license_number}
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Driving License Validity:</Box>
              <Box className={classes.bodyInfo}>
                {driverDetails.driving_license_validity}
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}> Driver Score:</Box>
              <Box className={classes.bodyInfo}>{driverDetails.driver_score}</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}> Vehicle Number:</Box>
              <Box className={classes.bodyInfo}>
                {driverDetails.vehicle ? driverDetails.vehicle.vin : "-"}
              </Box>
            </Box>
            <Box sx={{ mt: 2 }} component="form">
              <Box className={classes.fieldSetContainer} component="fieldset">
                <Box sx={{ fontWeight: "bold" }} component="legend">Driver License Details</Box>
                <Box>
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 3 }}
                    columns={{ xs: 12, sm: 12 }}
                    style={{ marginLeft: 0, padding: "32px 8px" }}
                  >
                    {
                      driverLicenseInfo.map(item => (
                        <Grid sx={{ mb: 2.5 }} key={item.id} container xs={12} sm={12}>
                          <Grid item xs={5}>
                            <Box className={classes.vehicleRCLabel}>{item.labelName} :</Box>
                          </Grid>
                          <Grid item xs={7}>
                            <Box className={classes.vehicleRCValue}>{driverDetails?.driver_licence_info?.[item.keyName] || "-"}</Box>
                          </Grid>
                        </Grid>
                      ))
                    }
                  </Grid>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} lg={7} style={{ paddingLeft: 16 }}>
            <DrivingHistory driverId={id} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
