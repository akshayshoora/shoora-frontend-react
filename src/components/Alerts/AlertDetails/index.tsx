import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth, monitor, transport } from "constants/RouteMiddlePath";
import { getDateTime } from "utils/calenderUtils";

export function AlertDetails() {
  const classes = useStyles();
  const navigate = useNavigate();

  const { id } = useParams();

  const { data: alert, isLoading } = useQuery(["alert_details", id], () =>
    getAlertDetails(String(id))
  );

  async function getAlertDetails(id: string) {
    return (await client.get(`${monitor}/alerts/${id}/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box style={{ padding: "80px 20px 20px 40px" }}>
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
            Alert Details
          </Typography>
        </Box>
      </Box>
      <Box className={classes.bodyContent}>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Alert Name:</Box>
          <Box
            className={classes.bodyInfo}
            style={{ textTransform: "capitalize" }}
          >
            {alert.alert_name}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Alert ID:</Box>
          <Box className={classes.bodyInfo}>{alert.id}</Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Device IMEI:</Box>
          <Box className={classes.bodyInfo}>{alert.device_imei}</Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Vehicle:</Box>
          <Box className={classes.bodyInfo}>
            {alert.vehicle ? alert.vehicle : "-"}
          </Box>
        </Box>
        <Box className={classes.infoBodyWrapper}>
          <Box className={classes.bodyInfoTitle}>Created at:</Box>
          <Box className={classes.bodyInfo}>
            {alert.created_at ? getDateTime(alert.created_at) : "-"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
