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
import {auth, transport} from "constants/RouteMiddlePath"

class NewVehicleType {
    "vehicle_type": string = "";
    "make": string | null = null;
    "model": string | null = null;
    "vin": string | null = null;
    "organization_id": string | null = null;
}

const vehicleType = [
    {
      value: "type1",
      label: "type1",
    },
    {
        value: "type2",
        label: "type2",
      },
      {
        value: "type3",
        label: "type3",
      },
      {
        value: "type4",
        label: "type4",
      },
      {
        value: "type5",
        label: "type5",
      },
  ];

  const madeBy = [
    {
      value: "company1",
      label: "company1",
    },
    {
        value: "company2",
        label: "company2",
      },
      {
        value: "company3",
        label: "company3",
      },
      {
        value: "company4",
        label: "company4",
      },
      {
        value: "company5",
        label: "company5",
      },
  ];


export default function AddVehicle() {
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
                navigate(`/${AppPaths.VEHICLES}`);
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
        onSuccess: () =>{
            setSnackbar({
                open: true,
                variant: "success",
                message: "Vehicle Updated.",
            })
            setTimeout(() => {
                navigate(`/${AppPaths.VEHICLES}`);
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
                ...vehicleDetails
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
        vehicles.organization_id=user.organization_id
       
        mutateAddVehicle(vehicles);
    }

    if (vehicleId && (loadingVehicleInfo && !vehicles.vehicle_type)) {
        return <LoadingScreen />;
    }
    
    async function getVehicleDetails(id: string) {
        return (await client.get(`${transport}/vehicles/${id}/`)).data;
    }


    const { vehicle_type} = vehicles;
    const isSaveButtonDisabled = !vehicle_type ;


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
                    <Typography fontSize={24}>
                        {!vehicleId ? "Add Vehicle" : "Edit Vehicle"}
                    </Typography>
                </Box>
            </Box>

            <Box className={classes.padding_24}>
                <Grid container spacing={4}>
                <Grid item xs={4}>
                                <Typography fontSize={16} style={{ fontWeight: 200,marginBottom:10, marginRight: 2 }}>
                    Select Vehicle Type
                    </Typography>
                    <Select
                    fullWidth
                    id="demo-simple-select"
                    value={vehicles.vehicle_type}
                    onChange={(e:any) => handleFormVehicle("vehicle_type", e.target.value)}
                    size="small"
                    >
                    <MenuItem selected value="" disabled>
                        Select Vehicle Type
                    </MenuItem>
                    {loadingVehicleInfo ? (
                        <MenuItem>
                        <CircularProgress />
                        </MenuItem>
                    ) : vehicleType.length ? (
                        vehicleType.map((item:any) => (
                        <MenuItem style={{ fontSize: 14 }} value={item.value}>
                            {item.label}
                        </MenuItem>
                        ))
                    ) : (
                        <MenuItem>Nothing to Select</MenuItem>
                    )}
                    </Select>
                  </Grid>
                   
                   
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
                <Grid container spacing={4}>
               
                    <Grid item xs={4}>
                                <Typography fontSize={16} style={{ fontWeight: 200,marginBottom:10, marginRight: 2 }}>
                    Select Maker
                    </Typography>
                    <Select
                    fullWidth
                    id="demo-simple-select"
                    value={vehicles.make}
                    onChange={(e:any) => handleFormVehicle("make", e.target.value)}
                    size="small"
                    >
                    <MenuItem selected value="" disabled>
                    Select Maker
                    </MenuItem>
                    {loadingVehicleInfo ? (
                        <MenuItem>
                        <CircularProgress />
                        </MenuItem>
                    ) : madeBy.length ? (
                        madeBy.map((item:any) => (
                        <MenuItem style={{ fontSize: 14 }} value={item.value}>
                            {item.label}
                        </MenuItem>
                        ))
                    ) : (
                        <MenuItem>Nothing to Select</MenuItem>
                    )}
                    </Select>
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
