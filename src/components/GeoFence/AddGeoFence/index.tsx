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
import {
  Circle,
  DrawingManager,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";
import GeoFenceMap from "../GeoFenceMap";
import CustomRadioGroup from "components/commonComponent/CustomRadioGroup.tsx";
const libraries = ["drawing", "places"];

class NewVehicleType {
  "vehicle_type": string = "";
  "make": string | null = null;
  "model": string | null = null;
  "vin": string | null = null;
  "organization_id": string | null = null;
}

export default function AddGeoFence() {
  const [vehicles, setVehicle] = useState<NewVehicleType>(new NewVehicleType());
  const [path, setPath] = useState([]);
  const [geofenceType, setGeofenceType] = useState("circle");
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

  const polyAxis = (polyaxisData: any) => {
    setPath(polyaxisData);
  };

  const onPolygonComplete = (polygon: any) => {
    console.log(polygon.getPath().getArray());
    const polyAxiss = polygon.getPath().getArray();
    let tempArr = [];
    for (let i in polyAxiss) {
      tempArr.push({ lat: polyAxiss[i].lat(), lng: polyAxiss[i].lng() });
      //   console.log(polyAxiss[i].lat());
    }
    polyAxis(tempArr);
  };

  const onCircleComplete = (circle: any) => {
    console.log(circle.radius);
  };

  const onLoad = (drawingManager: any) => {
    console.log(drawingManager);
  };

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

      <div style={{ marginLeft: "90px", marginRight: "90px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "50%" }}>
            {" "}
            <Box>
              <CustomRadioGroup
                selected={geofenceType}
                options={[
                  { label: "Polygon", value: "polygon" },
                  { label: "Circle", value: "circle" },
                ]}
                onChange={(value) => {
                  setGeofenceType(value);
                }}
              />
              {geofenceType == "circle" ? (
                <Box>
                  <TextInput
                    label="Name"
                    placeholder="Enter Name"
                    style={{ marginBottom: 24, width: "400px" }}
                    value={vehicles.model}
                    isRequired={false}
                    onChange={(value) => handleFormVehicle("model", value)}
                  />

                  <Typography
                    fontSize={16}
                    style={{
                      fontWeight: 200,
                      marginBottom: 10,
                      marginRight: 2,
                    }}
                  >
                    Select Place
                  </Typography>
                  <Select
                    id="demo-simple-select"
                    value={vehicles.make}
                    onChange={(e: any) => {}}
                    size="small"
                    style={{ marginBottom: 14, width: "400px" }}
                  >
                    <MenuItem selected value="" disabled>
                      Select Place
                    </MenuItem>

                    <MenuItem style={{ fontSize: 14 }} value={"place 1"}>
                      place 1
                    </MenuItem>
                  </Select>
                  <TextInput
                    label="Radius"
                    placeholder="Enter Radius"
                    style={{ marginBottom: 24, width: "400px" }}
                    value={vehicles.model}
                    isRequired={false}
                    onChange={(value) => handleFormVehicle("model", value)}
                  />
                  <Button onClick={() => {}} variant="outlined">
                    Save
                  </Button>
                </Box>
              ) : (
                <Box>
                  <h2>paths</h2>
                  <TextInput
                    label="Name"
                    placeholder="Enter Name"
                    style={{ marginBottom: 24, width: "400px" }}
                    value={vehicles.model}
                    isRequired={false}
                    onChange={(value) => handleFormVehicle("model", value)}
                  />
                  <Typography
                    fontSize={16}
                    style={{
                      fontWeight: 200,
                      marginBottom: 10,
                      marginRight: 2,
                    }}
                  >
                    Select Place
                  </Typography>
                  <Select
                    id="demo-simple-select"
                    value={vehicles.make}
                    onChange={(e: any) => {}}
                    size="small"
                    style={{ marginBottom: 14, width: "400px" }}
                  >
                    <MenuItem selected value="" disabled>
                      Select Place
                    </MenuItem>

                    <MenuItem style={{ fontSize: 14 }} value={"place 1"}>
                      place 1
                    </MenuItem>
                  </Select>
                  <Box>
                    <Button onClick={() => {}} variant="outlined">
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </div>
          <div style={{ width: "50%" }}>
            <GeoFenceMap polyAxis={polyAxis} type={geofenceType} />
          </div>
        </div>
      </div>
    </Box>
  );
}
