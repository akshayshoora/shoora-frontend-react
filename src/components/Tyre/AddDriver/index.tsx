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
  FormHelperText
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
  dob: string | null;
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
    dob: driverData?.dob || "",
  })
}

export default function AddDriver() {
  // const { data: vehicleList, isLoading: isVehicleLoading } = useQuery(
  //   ["vehicles"],
  //   () => getVehicle()
  // );
  const [driverImgFileState, setDriverImgFileState] = useState<any>("");
  const driverImgFileRef = useRef<any>(null);
  const [validationState, setValidationState] = useState<any>(null);

  async function getVehicle() {
    let getApiUrl = `${transport}/vehicles/?page=1&page_size=200`;

    const response = await client.get(getApiUrl);

    return response.data;
  }
  const [drivers, setDriver] = useState<any>(setInitialDriverData());
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
    onError: (error: any) => {
      let errorMessage: any = {};
      if (error?.response?.data) {
        const errorObj = error?.response?.data;
        Object.keys(errorObj).forEach((errorInfo: any) => {
          if (Array.isArray(errorObj[errorInfo]))
            errorMessage[errorInfo] = errorObj[errorInfo][0];
        })
        setValidationState(errorMessage);
      }
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

    onError: (error: any) => {
      let errorMessage: any = {};
      if (error?.response?.data) {
        const errorObj = error?.response?.data;
        Object.keys(errorObj).forEach((errorInfo: any) => {
          if (Array.isArray(errorObj[errorInfo]))
            errorMessage[errorInfo] = errorObj[errorInfo][0];
        })
        setValidationState(errorMessage);
      }
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    },
  });

  // const { isLoading: loadingUserInfo } = useQuery(
  //   ["driver_details", driverId],
  //   () => getDriverDetails(String(driverId)),
  //   {
  //     enabled: Boolean(driverId),
  //     refetchOnWindowFocus: false,
  //     onSuccess: (deviceDetails) => {
  //       const { image } = deviceDetails || {};
  //       setDriverImgFileState(image || "");
  //       const driverData = setInitialDriverData(deviceDetails);
  //       setDriver((prevState: any) => ({
  //         ...prevState,
  //         ...driverData
  //       }));
  //     },
  //   }
  // );

  function backToProperties() {
    navigate(-1);
  }

  function handleFormDriver(
    key: keyof any,
    value: string | boolean | number | []
  ) {
    setDriver({ ...drivers, [key]: value });
    setValidationState((prevState: any) => ({ ...prevState, [key]: "" }));
  }

  function addDriver(user: any) {
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

  // if (driverId && loadingUserInfo && !drivers) {
  //   return <LoadingScreen />;
  // }

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
    if (file.size <= 1000000) {
      driverImgFileRef.current = event.target.files[0];
      setDriverImgFileState(URL.createObjectURL(file));
    } else {
      setSnackbar({
        open: true,
        variant: "error",
        message: "File size should be less than 1mb.",
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

      {/* <PageLoading
        open={isAddingDriver || updatingDriver}
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
            {!driverId ? "Add Tyre Claim" : "Edit Tyre Claim"}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.padding_24}>
        <Grid container columnSpacing={4}>
          <Grid item xs={4}>
            <TextInput
              label="Size"
              placeholder="Enter Size"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("size", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Pattern"
              placeholder="Enter Pattern"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("pattern", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Ply rating"
              placeholder="Enter Ply Rating"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("plyRating", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Brand"
              placeholder="Enter Brand"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("brand", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Serial Number"
              placeholder="Enter Serial Number"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("serialNumber", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="DOT Code"
              placeholder="Enter Dot Code"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("dotCode", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="DOT Code"
              placeholder="Enter Dot Code"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("dotCode", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Month/Week Code"
              placeholder="Enter Month/Week Code"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("monthWeekCode", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Invoice number"
              placeholder="Enter Invoice number"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("invoiceNumber", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Remaining NSD- mm"
              placeholder="Enter Remaining NSD- mm"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("remainingNSD", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Original NSD"
              placeholder="Enter Original NSD"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("originalNSD", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="% NSD remaining"
              placeholder="Enter % NSD remaining"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("nsdRemaining", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="FOB price"
              placeholder="Enter FOB price"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("fobPrice", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Claim Amount"
              placeholder="Enter Claim Amount"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("claimAmount", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Technical Finding"
              placeholder="Enter Technical Finding"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("technicalFinding", value)
              }
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              label="Remarks if any"
              placeholder="Enter Remarks if any"
              style={{ marginBottom: 24 }}
              value={drivers.size}
              isRequired={false}
              onChange={(value) =>
                handleFormDriver("remarks", value)
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
          className="btn btn-primary"
          variant="outlined"
          onClick={handleSubmit}
          // disabled={isSaveButtonDisabled}
        >
          Save
        </Button>
      </Box>
    </Box >
  );
}
