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

class NewVehicleType {
  "vehicle_type": string = "";
  "make": string | null = null;
  "model": string | null = null;
  "vin": string | null = null;
  "organization_id": string | null = null;
}

export default function AddGeoFence() {
  const [vehicles, setVehicle] = useState<NewVehicleType>(new NewVehicleType());
  const { user } = useAppContext();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id: vehicleId } = useParams();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const addVehicleMutation = useMutation(addVehicle, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Vehicle added successfully.",
      });

      setTimeout(() => {
        navigate(`/${AppPaths.GEOFENCE}`);
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

  const updateVehicleMutation = useMutation(updateVehicle, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Vehicle Updated.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.GEOFENCE}`);
      }, 2000);
    },

    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });

  const { isLoading: loadingVehicleInfo } = useQuery(
    ["vehicles", vehicleId],
    () => getVehicleDetails(String(vehicleId)),
    {
      enabled: Boolean(vehicleId),
      refetchOnWindowFocus: false,
      onSuccess: (vehicleDetails) => {
        setVehicle({
          ...vehicles,
          ...vehicleDetails,
        });
      },
    }
  );
  function backToProperties() {
    navigate(-1);
  }

  function handleFormVehicle(
    key: keyof NewVehicleType,
    value: string | boolean | number | string[] | SelectChangeEvent<string[]>
  ) {
    setVehicle({ ...vehicles, [key]: value });
  }

  function addVehicle(vehicles: NewVehicleType) {
    return client.post(`${transport}/vehicles/`, {
      ...vehicles,
    });
  }

  function updateVehicle(vehicles: NewVehicleType) {
    return client.patch(`${transport}/vehicles/${vehicleId}/`, {
      ...vehicles,
    });
  }

  const { mutate: mutateAddVehicle, isLoading: isAddingVehicle } =
    addVehicleMutation;
  const { mutate: mutateUpdateVehicle, isLoading: updatingVehicle } =
    updateVehicleMutation;

  function handleSubmit() {
    if (vehicleId) {
      mutateUpdateVehicle(vehicles);
      return;
    }
    vehicles.organization_id = user.organization_id;

    mutateAddVehicle(vehicles);
  }

  if (vehicleId && loadingVehicleInfo && !vehicles.vehicle_type) {
    return <LoadingScreen />;
  }

  async function getVehicleDetails(id: string) {
    return (await client.get(`${transport}/vehicles/${id}/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  const { vehicle_type } = vehicles;
  const isSaveButtonDisabled = !vehicle_type;

  const loadingMessage = isAddingVehicle
    ? "Adding Vehicle..."
    : updatingVehicle
    ? "Updating Vehicle..."
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
        open={isAddingVehicle || updatingVehicle}
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
            {!vehicleId ? "Add Geofence" : "Edit Geofence"}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.padding_24}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextInput
              label="Vehicle Number"
              placeholder="Enter Vehicle Number"
              style={{ marginBottom: 24 }}
              value={vehicles.vin}
              isRequired={false}
              onChange={(value) => handleFormVehicle("vin", value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Model"
              placeholder="Enter Model"
              style={{ marginBottom: 24 }}
              value={vehicles.model}
              isRequired={false}
              onChange={(value) => handleFormVehicle("model", value)}
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
