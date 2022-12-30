import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
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
import { transport } from "constants/RouteMiddlePath";
import CustomRadioGroup from "components/commonComponent/CustomRadioGroup.tsx";

class NewDeviceType {
  "device_type": string = "";
  "imei_number": string | null = null;
  "sim_number": string | null = null;
  "organization": string | null = null;
  "is_assigned_to_vehicle": string | "" = "false";
}

export default function AddDevice() {
  const [devices, setDevice] = useState<NewDeviceType>(new NewDeviceType());
  const { user } = useAppContext();

  const navigate = useNavigate();
  const classes = useStyles();
  const { id: deviceId } = useParams();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const addDeviceMutation = useMutation(addDevice, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "User added successfully.",
      });

      setTimeout(() => {
        navigate(`/${AppPaths.USERS}`);
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

  const updateDeviceMutation = useMutation(updateDevice, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "User Updated.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.USERS}`);
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
    ["device_details", deviceId],
    () => getDeviceDetails(String(deviceId)),
    {
      enabled: Boolean(deviceId),
      refetchOnWindowFocus: false,
      onSuccess: (deviceDetails) => {
        setDevice({
          ...devices,
          ...deviceDetails,
        });
      },
    }
  );

  function backToProperties() {
    navigate(-1);
  }

  function handleFormDevice(
    key: keyof NewDeviceType,
    value: string | boolean | number | []
  ) {
    setDevice({ ...devices, [key]: value });
  }

  function addDevice(user: NewDeviceType) {
    return client.post(`${transport}/devices/`, {
      ...user,
    });
  }

  function updateDevice(user: NewDeviceType) {
    return client.patch(`/users/${deviceId}/`, {
      ...user,
    });
  }

  const { mutate: mutateAddDevice, isLoading: isAddingDevice } =
    addDeviceMutation;
  const { mutate: mutateUpdateDevice, isLoading: updatingDevice } =
    updateDeviceMutation;

  function handleSubmit() {
    if (deviceId) {
      mutateUpdateDevice(devices);
      return;
    }

    mutateAddDevice(devices);
  }

  if (deviceId && loadingUserInfo && !devices.device_type) {
    return <LoadingScreen />;
  }

  async function getDeviceDetails(id: string) {
    return (await client.get(`/devices/${id}/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  const { device_type } = devices;
  const isSaveButtonDisabled = !device_type;

  const loadingMessage = isAddingDevice
    ? "Adding Device..."
    : updatingDevice
    ? "Updating Device..."
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

      <PageLoading
        open={isAddingDevice || updatingDevice}
        loadingMessage={loadingMessage}
      />

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
            {!deviceId ? "Add Device" : "Edit Device"}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.padding_24}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            {/* <TextInput
                            label="Device Type"
                            placeholder="Enter Device name"
                            style={{ marginBottom: 24 }}
                            value={devices.device_type}
                            isRequired={true}
                            onChange={(value) => handleFormDevice("device_type", value)}
                        /> */}
            <SelectField
              label="Device Type"
              isLoading={false}
              menuItems={[{ label: "device1", value: "device1" }]}
              style={{ marginBottom: 12 }}
              value={"device1"}
              isRequired={true}
              onChange={(value) => handleFormDevice("device_type", value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Organization"
              placeholder="Enter Organization"
              style={{ marginBottom: 24 }}
              value={devices.organization}
              isRequired={true}
              onChange={(value) => handleFormDevice("organization", value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              label="Sim Number"
              placeholder="Enter Sim number"
              style={{ marginBottom: 24 }}
              value={devices.sim_number}
              isRequired={false}
              onChange={(value) => handleFormDevice("sim_number", value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextInput
              label="IMEI Number"
              placeholder="Enter IMEI Number"
              style={{ marginBottom: 24 }}
              value={devices.imei_number}
              isRequired={false}
              onChange={(value) => handleFormDevice("imei_number", value)}
            />
          </Grid>
          <Grid item xs={4}>
            {/* <TextInput
                            label="Assigned to Vehicle"
                            placeholder="Enter Vehicle"
                            style={{ marginBottom: 24 }}
                            value={devices.is_assigned_to_vehicle}
                            isRequired={false}
                            onChange={(value) => handleFormDevice("is_assigned_to_vehicle", value)}
                            
                        /> */}
            <Typography style={{ fontWeight: 200, marginBottom: 8 }}>
              Assigned to Vehicle
            </Typography>
            <CustomRadioGroup
              selected={devices.is_assigned_to_vehicle}
              options={[
                { label: "Yes", value: "true" },
                { label: "No", value: "false" },
              ]}
              onChange={(value) =>
                handleFormDevice("is_assigned_to_vehicle", value)
              }
            />
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
