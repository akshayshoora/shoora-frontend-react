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
import { Key, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import TextInput from "components/commonComponent/TextInput";
import client from "serverCommunication/client";
import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths } from "../../../constants/commonEnums";
import PageLoading from "components/commonComponent/PageLoading";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { useAppContext } from "ContextAPIs/appContext";
import SelectField from "components/commonComponent/SelectField";
import { auth, transport } from "constants/RouteMiddlePath";

class NewAlertType {
  "identifier": string = "";
  "location_packet_type": string | null = null;
  "message_body_length": string | null = null;
  "imei": string | null = null;
  "message_serial_number": number | null = null;
  "alarm_series": number | null = null;
  "terminal_status"?: boolean;
  "ignition_status"?: boolean;
  "latitude": number | null = null;
  "longitude": number | null = null;
  "height": number | null = null;
  "speed": number | null = null;
  "direction": string | null = null;
  "organization": string | null = null;
}

export default function AddAlert() {
  const [alerts, setAlerts] = useState<NewAlertType>(new NewAlertType());
  const { user } = useAppContext();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id: alertId } = useParams();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const addAlertMutation = useMutation(addAlert, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Alert added successfully.",
      });

      setTimeout(() => {
        navigate(`/${AppPaths.ALERTS}`);
      }, 2000);
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      });
    },
  });

  const updateUserMutation = useMutation(updateAlert, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "User Updated.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.ALERTS}`);
      }, 2000);
    },

    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });

  const { isLoading: loadingUserInfo } = useQuery(
    ["alert", alertId],
    () => getAlertDetails(String(alertId)),
    {
      enabled: Boolean(alertId),
      refetchOnWindowFocus: false,
      onSuccess: (alertDetails) => {
        setAlerts({
          ...alerts,
          ...alertDetails,
        });
      },
    }
  );
  function backToProperties() {
    navigate(-1);
  }

  function handleFormUser(
    key: keyof NewAlertType,
    value: string | boolean | number | string[] | SelectChangeEvent<string[]>
  ) {
    setAlerts({ ...alerts, [key]: value });
  }

  function addAlert(alert: NewAlertType) {
    return client.post(`${transport}/alerts/`, {
      ...alert,
    });
  }

  function updateAlert(alert: NewAlertType) {
    // delete user.password
    return client.patch(`${transport}/alerts/${alertId}/`, {
      ...alert,
    });
  }

  const { mutate: mutateAddAlerts, isLoading: isAddingAlert } =
    addAlertMutation;
  const { mutate: mutateUpdateAlert, isLoading: updatingAlert } =
    updateUserMutation;

  function handleSubmit() {
    if (alertId) {
      mutateUpdateAlert(alerts);
      return;
    }
    alerts.organization = user.organization_id;

    mutateAddAlerts(alerts);
  }

  if (alertId && loadingUserInfo && !alerts.identifier) {
    return <LoadingScreen />;
  }

  async function getAlertDetails(id: string) {
    return (await client.get(`${transport}/alerts/${id}/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  const { identifier, imei } = alerts;
  const isSaveButtonDisabled = !identifier || !imei;

  const loadingMessage = isAddingAlert
    ? "Adding Alert..."
    : updatingAlert
    ? "Updating Alert..."
    : "";

  return (
    <Box className={classes.positionRelative}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.variant}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* <PageLoading
                open={isAddingAlert || updateAlert}
                loadingMessage={loadingMessage}
            /> */}

      <Box className={classes.headingWrapper}>
        <Box className={classes.headingContent}>
          <IconButton
            className={classes.headingBackButton}
            size="small"
            onClick={GoToBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography fontSize={24}>
            {!alertId ? "Add Alert" : "Edit Alert"}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.padding_24}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextInput
              label="Identifier"
              placeholder="Enter identifier"
              style={{ marginBottom: 24 }}
              value={alerts.identifier}
              isRequired={true}
              onChange={(value) => handleFormUser("identifier", value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Location Packet type"
              placeholder="Enter Location Packet type"
              style={{ marginBottom: 24 }}
              value={alerts.location_packet_type}
              isRequired={false}
              disabled
              onChange={(value) => {}}
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              label="Email"
              placeholder="Enter Email"
              style={{ marginBottom: 24 }}
              value={alerts.location_packet_type}
              isRequired={true}
              onChange={(value) =>
                handleFormUser("location_packet_type", value)
              }
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              label="Message Body Length"
              placeholder="Enter Message Body Length"
              regex={/[^0-9]/g}
              style={{ marginBottom: 24 }}
              value={alerts.message_body_length}
              isRequired={false}
              onChange={(value) => handleFormUser("message_body_length", value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextInput
              label="IMEI"
              placeholder="Enter IMEI"
              style={{ marginBottom: 24 }}
              value={alerts.imei}
              isRequired={false}
              onChange={(value) => handleFormUser("imei", value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              label="Message Serial Number"
              placeholder="Enter Message Serial Number"
              regex={/[^0-9]/g}
              style={{ marginBottom: 24 }}
              value={alerts.message_serial_number}
              isRequired={false}
              onChange={(value) =>
                handleFormUser("message_serial_number", value)
              }
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              label="Alarm Series"
              placeholder="Enter Alarm Series"
              style={{ marginBottom: 24 }}
              value={alerts.alarm_series}
              isRequired={false}
              onChange={(value) => handleFormUser("alarm_series", value)}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            {/* <TextInput
                            label="Terminal Status"
                            placeholder="Enter address"
                            style={{ marginBottom: 24 }}
                            value={alerts.terminal_status}
                            isRequired={false}
                            onChange={(e: any) => handleFormUser("terminal_status", e.target.value)}
                        /> */}
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.footerWrapper}>
        <Button style={{ marginRight: 12 }} onClick={backToProperties}>
          Cancel
        </Button>
        <Button
          id="submit"
          variant={isSaveButtonDisabled ? "outlined" : "contained"}
          onClick={handleSubmit}
          disabled={isSaveButtonDisabled}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
