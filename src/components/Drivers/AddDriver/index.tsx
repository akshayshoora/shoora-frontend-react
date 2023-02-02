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
import { useEffect, useState, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import TextInput from "components/commonComponent/TextInput";
import Avatar from '@mui/material/Avatar';
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
import DriverImage from "../../../assets/driver-img.png";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface INewDriver {
  name: string | null;
  phone_number: string | null;
  passport_number: string | null;
  passport_validity: string | null;
  driving_license_number: string | null;
  driving_license_validity: string | null;
  organization: string | null;
  vehicle_id: string | null;
}

function setInitialDriverData(driverData?: any): INewDriver {
  return ({
    name: driverData?.name || "",
    phone_number: driverData?.phone_number || "",
    passport_number: driverData?.passport_number || "",
    passport_validity: driverData?.passport_validity || "",
    driving_license_number: driverData?.driving_license_number || "",
    driving_license_validity: driverData?.driving_license_validity || "",
    // driver_score: driverData?.driver_score || "",
    organization: driverData?.organization || "",
    vehicle_id: driverData?.vehicle_id || "",
  })
}

export default function AddDriver() {
  const { data: vehicleList, isLoading: isVehicleLoading } = useQuery(
    ["vehicles"],
    () => getVehicle()
  );
  const [driverImgFileState, setDriverImgFileState] = useState<any>("");
  const driverImgFileRef = useRef<any>(null);

  async function getVehicle() {
    let getApiUrl = `${transport}/vehicles/`;

    const response = await client.get(getApiUrl);

    return response.data;
  }
  const [drivers, setDriver] = useState<INewDriver>(setInitialDriverData());
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
        const { image } = deviceDetails || {};
        setDriverImgFileState(image || "");
        const driverData = setInitialDriverData(deviceDetails);
        setDriver(prevState => ({
          ...prevState,
          ...driverData
        }));
      },
    }
  );

  function backToProperties() {
    navigate(-1);
  }

  function handleFormDriver(
    key: keyof INewDriver,
    value: string | boolean | number | []
  ) {
    setDriver({ ...drivers, [key]: value });
  }

  function addDriver(user: INewDriver) {
    let payload = undefined;
    if (driverImgFileRef.current) {
      const formData = new FormData();
      formData.append("image", driverImgFileRef.current);
      Object.keys(user).forEach((itemKey) => {
        if (user)
          formData.append(itemKey, (user as any)[itemKey].toString());
      });
      payload = formData;
    } else {
      payload = { ...user };
    }
    return client.post(`${transport}/drivers/`, payload);
  }

  function updateDriver(user: INewDriver) {
    let payload = undefined;
    if (driverImgFileRef.current) {
      const formData = new FormData();
      formData.append("image", driverImgFileRef.current);
      Object.keys(user).forEach((itemKey: string) => {
        if (user)
          formData.append(itemKey, (user as any)[itemKey].toString());
      })
      payload = formData;
    } else {
      payload = { ...user };
    }
    return client.patch(`/${transport}/drivers/${driverId}/`, payload);
  }

  const { mutate: mutateAddDriver, isLoading: isAddingDriver } =
    addDeviceMutation;
  const { mutate: mutateUpdateDriver, isLoading: updatingDriver } =
    updateDeviceMutation;

  function handleSubmit() {
    let payload = {};
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

  function handleFileUploadHnlr(event: any) {
    const file = event.target.files[0];
    if (file.size <= 50000) {
      driverImgFileRef.current = event.target.files[0];
      setDriverImgFileState(URL.createObjectURL(file));
    } else {
      setSnackbar({
        open: true,
        variant: "error",
        message: "File size should be less than 50kb.",
      })
    }

  }

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
        <Grid container columnSpacing={4}>
          <Grid item xs={4}>
            <Box sx={{
              display: "flex", flexDirection: "column", justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}>
              <Box sx={{ position: "relative" }}>
                <Box sx={{ position: "absolute", bottom: "5px", right: "-4px", zIndex: 1 }}>
                  <Box component="label" htmlFor="driver-image">
                    <Box sx={{
                      borderRadius: "100%", p: 0.5,
                      background: "#ecebf1",
                      height: "24px", width: "24px", color: "#878a99",
                      cursor: "pointer",
                      justifyContent: "center",
                      border: "1px solid #d4d2e0",
                      alignItems: "center",
                      display: "flex"
                    }}>
                      {/* <InsertPhotoIcon sx={{ height: "18px", width: "18px" }} /> */}
                      <BorderColorIcon sx={{ height: "18px", width: "18px", color: "#261f5a" }} />
                    </Box>
                  </Box>
                  <input name="driver-image" id="driver-image"
                    hidden accept="image/*" onChange={handleFileUploadHnlr} type="file" />
                </Box>
                <Box sx={{
                  p: 0.5, border: "1px solid #d4d2e0", borderRadius: "100%"
                  , backgroundColor: "#ECEBF1"
                }}>
                  <Avatar
                    alt="driver-image"
                    src={driverImgFileState || DriverImage}
                    sx={{ width: 100, height: 100 }}
                  />
                </Box>
              </Box>
              <Box sx={{ textAlign: "center", mt: 0.5, px: 2, fontSize: "0.9rem" }}>
                * Maximum size 50kb allowed in PNG or JPG or JPEG format.
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Grid container columnSpacing={4}>
              <Grid item xs={6}>
                <TextInput
                  label="Driver Name"
                  placeholder="Enter Driver name"
                  style={{ marginBottom: 24 }}
                  value={drivers.name}
                  isRequired={true}
                  onChange={(value) => handleFormDriver("name", value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextInput
                  label="Phone Number"
                  placeholder="Enter Phone number"
                  style={{ marginBottom: 24 }}
                  value={drivers.phone_number}
                  isRequired={false}
                  onChange={(value) => handleFormDriver("phone_number", value)}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  fontSize={16}
                  style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
                >
                  Vehicles
                </Typography>
                <Select
                  fullWidth
                  id="demo-simple-select"
                  value={drivers.vehicle_id}
                  onChange={(e: any) => handleFormDriver("vehicle_id", e.target.value)}
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
              <Grid item xs={6}>
                <TextInput
                  label="Passport Number"
                  placeholder="Enter Passport Number"
                  style={{ marginBottom: 24 }}
                  value={drivers.passport_number}
                  isRequired={false}
                  onChange={(value) => handleFormDriver("passport_number", value)}
                />
              </Grid>

            </Grid>
          </Grid>

        </Grid>
        <Grid container columnSpacing={4}>
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
          {/* <Grid item xs={4}>
            {driverId && <TextInput
              label="Driver Score"
              placeholder="Driver Score"
              style={{ marginBottom: 24 }}
              value={drivers.driver_score}
              isRequired={false}
              disabled={true}
              onChange={(value) => handleFormDriver("driver_score", value)}
            />}
          </Grid> */}
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
    </Box >
  );
}
