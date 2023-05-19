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
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, formState:{errors} } = useForm<INewDriver>();
  const { data: vehicleList, isLoading: isVehicleLoading } = useQuery(
    ["vehicles"],
    () => getVehicle()
  );
  const [driverImgFileState, setDriverImgFileState] = useState<any>("");
  const driverImgFileRef = useRef<any>(null);
  const [validationState, setValidationState] = useState<any>(null);

  async function getVehicle() {
    let getApiUrl = `${transport}/vehicles/?page=1&page_size=200`;

    const response = await client.get(getApiUrl);

    return response.data;
  }
  const [drivers, setDriver] = useState<INewDriver>(setInitialDriverData());
  const { user } = useAppContext();
  const phoneRegex = /^[0-9]{10}$/;

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
    setValidationState((prevState: any) => ({ ...prevState, [key]: "" }));
  }
  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {


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

  function onSubmit() {
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
  //const isSaveButtonDisabled = !name;

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
                * Maximum size 1mb allowed in PNG or JPG or JPEG format.
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Grid container columnSpacing={4}>
              <Grid item xs={6} style={{ marginBottom: 24 }}>
              <label style={{marginBottom:"8px", display: "flex",alignItems: "center"}}> Driver Name * </label>
                  <input type="text"
                  placeholder="Enter Driver Name"
                  id="name"
                  {...register('name',{required : true})}
                  className={errors.name ? classes.errorinput : ''}  
                  style={{padding:"9px",fontSize:"16px",width:300,backgroundColor:"inherit"}}
                  />

                       {errors.name && <p className={classes.formerror}>Driver Name Is Required</p>}
              </Grid>
              <Grid item xs={6}>
              <label style={{marginBottom:"8px", display: "flex",alignItems: "center"}}> Phone Number </label>
                  <input type="Phone Number"
                  placeholder="Enter Phone Number"
                  id="Phone Number"
                  {...register('phone_number',{required : true, pattern: phoneRegex})}  
                  className={errors.phone_number ? classes.errorinput : ''}                 
                  style={{padding:"9px",fontSize:"16px",width:300 ,backgroundColor:"inherit"}}
                  />
                  {errors.phone_number?.type === 'required' && (
          <p className={classes.formerror}>Phone Number Is Required</p>
        )}
        {errors.phone_number?.type === 'pattern' && (
          <p className={classes.formerror}>Invalid Phone Number Format</p>
        )}

         </Grid>
              <Grid item xs={6} style={{ marginBottom: 24 }}>
                <Typography
                  fontSize={16}
                  style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
                >
                  Vehicles
                </Typography>
                <Select
                  {...register('vehicle_id',{required:true})}
                  className={errors.vehicle_id ? classes.errorinput : ''} 
                  style={{padding:"2px",fontSize:"14px",width:320,backgroundColor:"inherit" }}
                  displayEmpty
                  size="small"
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
                        {item.vin}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem>Nothing to Select</MenuItem>
                  )}
                </Select>
                {errors.vehicle_id && <div className={classes.formerror}>Vehicle Is Required</div>}
              </Grid>
            
              <Grid item xs={6}>
              <label style={{marginBottom:"8px", display: "flex",alignItems: "center"}}> Passport Number </label>
                  <input  type="text"
                  placeholder="Enter Passport Number"
                  id="name"
                  {...register('passport_number',{required : true})} 
                  className={errors.passport_number ? classes.errorinput : ''} 
                  style={{padding:"9px",fontSize:"16px",width:300,backgroundColor:"inherit" }}
                 
                 
                  />

                       {errors.passport_number && <p className={classes.formerror}>Passport Number Is Required</p>}
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
            <input
              id="date"
              type="date"
              {...register('passport_validity',{required:true})}
              className={errors.passport_validity ? classes.errorinput : ''} 
              style={{padding:"9px",fontSize:"16px",width:300,backgroundColor:"inherit" }}
              />
            {errors.passport_validity && <p className={classes.formerror}> Passport Validity Is Required</p>}
          </Grid>
          <Grid item xs={4} style={{ marginBottom: 24 }}>
          <label style={{marginBottom:"8px", display: "flex",alignItems: "center"}}> Driving License Number </label>
                  <input type="text"
                  placeholder="Enter Driving License Number"
                  id="Driving License Number"
                  {...register('driving_license_number',{required : true})}
                  className={errors.driving_license_number ? classes.errorinput : ''}  
                  style={{padding:"9px",fontSize:"16px", width:300,backgroundColor:"inherit" }}
                  />

                       {errors.driving_license_number && <p className={classes.formerror}>Driving License Is Required</p>}
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontSize={16}
              style={{ fontWeight: 200, marginBottom: 8 }}
            >
              Driving License Validity
            </Typography>
            <input
              id="date"
              type="date"
              //sx={{ width: "100%" }}
              {...register('driving_license_validity',{required:true})}
              className={errors.driving_license_validity ? classes.errorinput : ''} 
              style={{padding:"9px",fontSize:"16px",width:300,backgroundColor:"inherit" }}
              
            /> 
            {errors.driving_license_validity && <p className={classes.formerror}> Driving License Validity Is Required</p>}
          </Grid>
          <Grid item xs={4}>
            <Typography
              fontSize={16}
              style={{ fontWeight: 200, marginBottom: 8 }}
            >
              Date Of Birth
            </Typography>
            <input
              // id="date"
              id="dob"
              type="date"
              {...register('dob',{required:true})}
              className={errors.dob ? classes.errorinput : ''} 
              style={{padding:"9px",fontSize:"16px",width:300,backgroundColor:"inherit" }}
              
            />
            {errors.dob && <p className={classes.formerror}>Date Of Birth Is Required</p> }
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
          //variant={isSaveButtonDisabled ? "outlined" : "contained"}
          onClick={handleSubmit(onSubmit)}
          //disabled={isSaveButtonDisabled}
        >
          Save
        </Button>
      </Box>
    </Box >
  );
}
