import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
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

class NewDriver {
  "name": string = "";
  "phone_number": string | null = null;
  "passport_number": string | null = null;
  "passport_validity": string | null = null;
  "driving_license_number": string | null = null;
  "driving_license_validity": string | null = null;
  "driver_score": string | null = null;
  "organization": string | null = null;
  "vehicle": string | null = null;
}

export default function AddDriver() {
  const { data: vehicleList, isLoading: isVehicleLoading } = useQuery(
    ["vehicles"],
    () => getVehicle()
  );

  async function getVehicle() {
    let getApiUrl = `${transport}/vehicles/`;

    const response = await client.get(getApiUrl);

    return response.data;
  }
  const [drivers, setDriver] = useState<NewDriver>(new NewDriver());
  const { user } = useAppContext();

  const navigate = useNavigate();
  const classes = useStyles();
  const { id: driverId } = useParams();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const addDeviceMutation = useMutation(addDriver, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Driver added successfully.",
      });

      setTimeout(() => {
        navigate(`/${AppPaths.DRIVERS}`);
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

  const updateDeviceMutation = useMutation(updateDriver, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Driver Updated.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.DRIVERS}`);
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
    ["driver_details", driverId],
    () => getDriverDetails(String(driverId)),
    {
      enabled: Boolean(driverId),
      refetchOnWindowFocus: false,
      onSuccess: (deviceDetails) => {
        setDriver({
          ...drivers,
          ...deviceDetails,
        });
      },
    }
  );

  function backToProperties() {
    navigate(-1);
  }

  function handleFormDriver(
    key: keyof NewDriver,
    value: string | boolean | number | []
  ) {
    setDriver({ ...drivers, [key]: value });
  }

  function addDriver(user: NewDriver) {
    return client.post(`${transport}/drivers/`, {
      ...user,
    });
  }

  function updateDriver(user: NewDriver) {
    return client.patch(`/${transport}/drivers/${driverId}/`, {
      ...user,
    });
  }

  const { mutate: mutateAddDriver, isLoading: isAddingDriver } =
    addDeviceMutation;
  const { mutate: mutateUpdateDriver, isLoading: updatingDriver } =
    updateDeviceMutation;

  function handleSubmit() {
    if (driverId) {
      mutateUpdateDriver(drivers);
      return;
    }
    drivers.organization = user.organization_id;
    mutateAddDriver(drivers);
  }

  if (driverId && loadingUserInfo && !drivers) {
    return <LoadingScreen />;
  }

  async function getDriverDetails(id: string) {
    return (await client.get(`${transport}/drivers/${id}/`)).data;
  }
  function GoToBack() {
    navigate(-1);
  }

  const { name } = drivers;
  const isSaveButtonDisabled = !name;

  const loadingMessage = isAddingDriver
    ? "Adding Driver..."
    : updatingDriver
    ? "Updating Driver..."
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
        open={isAddingDriver || updatingDriver}
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
            {!driverId ? "Add Driver" : "Edit Driver"}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.padding_24}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextInput
              label="Driver Name"
              placeholder="Enter Driver name"
              style={{ marginBottom: 24 }}
              value={drivers.name}
              isRequired={true}
              onChange={(value) => handleFormDriver("name", value)}
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              label="Phone Number"
              placeholder="Enter Phone number"
              style={{ marginBottom: 24 }}
              value={drivers.phone_number}
              isRequired={false}
              onChange={(value) => handleFormDriver("phone_number", value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontSize={16}
              style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
            >
              Vehicles
            </Typography>
            <Select
              fullWidth
              id="demo-simple-select"
              value={drivers.vehicle}
              onChange={(e: any) => handleFormDriver("vehicle", e.target.value)}
              size="small"
              displayEmpty
            >
              <MenuItem value="" disabled>
                Vehicles
              </MenuItem>
              {isVehicleLoading ? (
                <MenuItem>
                  <CircularProgress />
                </MenuItem>
              ) : vehicleList?.results?.length ? (
                vehicleList?.results?.map((item: any, index: any) => (
                  <MenuItem style={{ fontSize: 14 }} value={item.id}>
                    {item.vehicle_type}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>Nothing to Select</MenuItem>
              )}
            </Select>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextInput
              label="Passport Number"
              placeholder="Enter Passport Number"
              style={{ marginBottom: 24 }}
              value={drivers.passport_number}
              isRequired={false}
              onChange={(value) => handleFormDriver("passport_number", value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontSize={16}
              style={{ fontWeight: 200, marginBottom: 8 }}
            >
              Passport Validity
            </Typography>
            <TextField
              id="date"
              type="date"
              sx={{ width: "100%" }}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={drivers.passport_validity}
              onChange={(e: any) =>
                handleFormDriver("passport_validity", e.target.value)
              }
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              label="Driving Lincense Number"
              placeholder="Enter Driving Lincense Number"
              style={{ marginBottom: 24 }}
              value={drivers.driving_license_number}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("driving_license_number", value)
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Typography
              fontSize={16}
              style={{ fontWeight: 200, marginBottom: 8 }}
            >
              Driving License Validity
            </Typography>
            <TextField
              id="date"
              type="date"
              sx={{ width: "100%" }}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              value={drivers.driving_license_validity}
              onChange={(e: any) =>
                handleFormDriver("driving_license_validity", e.target.value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Driver Score"
              placeholder="Driver Score"
              style={{ marginBottom: 24 }}
              value={drivers.driver_score}
              isRequired={false}
              disabled={driverId ? true : false}
              onChange={(value) => handleFormDriver("driver_score", value)}
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
