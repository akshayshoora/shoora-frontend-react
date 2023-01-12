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
import Autocomplete from "react-google-autocomplete";
import GeoFenceMap from "../GeoFenceMap";
import CustomRadioGroup from "components/commonComponent/CustomRadioGroup.tsx";

class NewGeofenceType {
  "name": string = "";
  "latitude": number;
  "longitude": number;
  "radius": string | number;
  "organization_id": string;
  "branch_id": string;
}

export default function AddGeoFence() {
  const [geofenceData, setGeofenceData] = useState<NewGeofenceType>(
    new NewGeofenceType()
  );
  const [path, setPath] = useState([]);
  const [geofenceType, setGeofenceType] = useState("circle");
  const [center, setCenter] = useState<any>({
    lat: 28.6862738,
    lng: 77.2217831,
  });
  const [lat, setLat] = useState(28.6862738);
  const [lng, setLng] = useState(77.2217831);
  const { user } = useAppContext();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id: geofenceId } = useParams();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const addGeofenceMutation = useMutation(addGeofence, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Geofence added successfully.",
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

  const updateGeofenceMutation = useMutation(updateGeofence, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Geofence Updated.",
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

  const { isLoading: loadingGeofenceInfo } = useQuery(
    ["Geofence", geofenceId],
    () => getGeofenceDetails(String(geofenceId)),
    {
      enabled: Boolean(geofenceId),
      refetchOnWindowFocus: false,
      onSuccess: (geofenceDetails) => {
        setGeofenceData({
          ...geofenceData,
          ...geofenceDetails,
        });
      },
    }
  );

  function handleFormGeofence(
    key: keyof NewGeofenceType,
    value: string | boolean | number | string[] | SelectChangeEvent<string[]>
  ) {
    setGeofenceData({ ...geofenceData, [key]: value });
  }

  function addGeofence(geofence: NewGeofenceType) {
    return client.post(`${transport}/geofences/`, {
      ...geofence,
    });
  }

  function updateGeofence(geofence: NewGeofenceType) {
    return client.patch(`${transport}/geofences/${geofenceId}/`, {
      ...geofence,
    });
  }

  const { mutate: mutateAddGeofence, isLoading: isAddingGeofence } =
    addGeofenceMutation;
  const { mutate: mutateUpdateGeofence, isLoading: isUpdatingGeofence } =
    updateGeofenceMutation;

  const handleSubmit = () => {
    if (geofenceId) {
      mutateUpdateGeofence(geofenceData);
      return;
    }
    geofenceData.organization_id = user.organization_id;
    geofenceData.latitude = lat;
    geofenceData.longitude = lng;

    mutateAddGeofence(geofenceData);
  };

  if (geofenceId && loadingGeofenceInfo) {
    return <LoadingScreen />;
  }

  async function getGeofenceDetails(id: string) {
    return (await client.get(`${transport}/geofences/${id}/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  const loadingMessage = isAddingGeofence
    ? "Adding Geofence..."
    : isUpdatingGeofence
    ? "Updating Geofence..."
    : "";

  const polyAxis = (polyaxisData: any) => {
    setPath(polyaxisData);
  };

  const isSaveButtonDisabled = !geofenceData.name || !geofenceData.radius;

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
        open={isAddingGeofence || isUpdatingGeofence}
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
            {!geofenceId ? "Add Geofence" : "Edit Geofence"}
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
                    value={geofenceData.name}
                    isRequired={false}
                    onChange={(value) => handleFormGeofence("name", value)}
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
                  <Autocomplete
                    style={{
                      marginBottom: 14,
                      width: "376px",
                      padding: "10px",
                      background: "none",
                      border: "2px solid #bfbec1",
                    }}
                    apiKey={process.env.REACT_APP_MAP_KEY}
                    onPlaceSelected={(place) => {
                      const location: any = place.geometry?.location;
                      setLat(location.lat());
                      setLng(location.lng());
                      setCenter({ lat: location.lat(), lng: location.lng() });
                    }}
                  />
                  <TextInput
                    label="Radius"
                    regex={/[^0-9]/g}
                    placeholder="Enter Radius"
                    style={{ marginBottom: 24, width: "400px" }}
                    value={geofenceData.radius}
                    isRequired={false}
                    onChange={(value) => handleFormGeofence("radius", value)}
                  />
                  <Button
                    onClick={() => {
                      handleSubmit();
                    }}
                    disabled={isSaveButtonDisabled}
                    variant={isSaveButtonDisabled ? "outlined" : "contained"}
                  >
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
                    value={geofenceData.name}
                    isRequired={false}
                    onChange={(value) => handleFormGeofence("name", value)}
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

                  <Autocomplete
                    style={{
                      marginBottom: 14,
                      width: "376px",
                      padding: "10px",
                      background: "none",
                      border: "2px solid #bfbec1",
                    }}
                    apiKey={process.env.REACT_APP_MAP_KEY}
                    onPlaceSelected={(place) => {
                      const location: any = place.geometry?.location;
                      setLat(location.lat());
                      setLng(location.lng());
                      setCenter({ lat: location.lat(), lng: location.lng() });
                    }}
                  />
                  <Box>
                    <Button
                      id="submit"
                      variant={isSaveButtonDisabled ? "outlined" : "contained"}
                      onClick={() => {}}
                      disabled={isSaveButtonDisabled}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </div>
          <div style={{ width: "50%" }}>
            <GeoFenceMap
              circleRadius={Number(geofenceData?.radius)}
              center={center}
              polyAxis={polyAxis}
              type={geofenceType}
            />
          </div>
        </div>
      </div>
    </Box>
  );
}
