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
import {transport} from 'constants/RouteMiddlePath';
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
    "vehicle": string | null = null
}

export default function AddDriver() {
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
    
    const addDeviceMutation = useMutation(addDevice, {
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

    const updateDeviceMutation = useMutation(updateDevice, {
        onSuccess: () =>{
            setSnackbar({
                open: true,
                variant: "success",
                message: "Driver Updated.",
            })
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
        () => getDeviceDetails(String(driverId)),
        {
            enabled: Boolean(driverId),
            refetchOnWindowFocus: false,
            onSuccess: (deviceDetails) => {
                setDriver({
                ...drivers,
                ...deviceDetails
                });
            },
        }
    );

    function backToProperties() {
        navigate(-1);
    }

    function handleFormDevice(
        key: keyof NewDriver,
        value: string | boolean | number | []
    ) {
        setDriver({ ...drivers, [key]: value });
    }

    function addDevice(user: NewDriver) {
        return client.post(`${transport}/drivers/`, {
            ...user,
        });
    }

    function updateDevice(user: NewDriver) {
        return client.patch(`/users/${driverId}/`, {
            ...user,
        });
    }

    const { mutate: mutateAddDevice, isLoading: isAddingDevice } =
    addDeviceMutation;
    const { mutate: mutateUpdateDevice, isLoading: updatingDevice } =
    updateDeviceMutation;

    function handleSubmit() {
        if (driverId) {
             mutateUpdateDevice(drivers);
            return;
        }
        drivers.organization=user.organization_id
        console.log('drivers--',drivers)
        mutateAddDevice(drivers);
    }

    if (driverId && (loadingUserInfo && !drivers)) {
        return <LoadingScreen />;
    }
    
    async function getDeviceDetails(id: string) {
        return (await client.get(`/devices/${id}/`)).data;
    }

   


    const { name} = drivers;
    const isSaveButtonDisabled = !name ;


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
                            onChange={(value) => handleFormDevice("name", value)}
                        />
                        
                    </Grid>
                    
                    <Grid item xs={4}>
                        <TextInput
                            label="Phone Number"
                            placeholder="Enter Phone number"
                            style={{ marginBottom: 24 }}
                            value={drivers.phone_number}
                            isRequired={false}
                            onChange={(value) => handleFormDevice("phone_number", value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            label="Vehicle"
                            placeholder="Vehicle"
                            style={{ marginBottom: 24 }}
                            value={drivers.vehicle}
                            isRequired={false}
                            onChange={(value) => handleFormDevice("vehicle", value)}
                            
                        />
                            
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
                            onChange={(value) => handleFormDevice("passport_number", value)}
                            
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            label="Passport Validity"
                            placeholder="Enter Passport Validity"
                            style={{ marginBottom: 24 }}
                            value={drivers.passport_validity}
                            isRequired={false}
                            onChange={(value) => handleFormDevice("passport_validity", value)}
                            
                        />
                            
                    </Grid>

                    <Grid item xs={4}>
                        <TextInput
                            label="Driving Lincense Number"
                            placeholder="Enter Driving Lincense Number"
                            style={{ marginBottom: 24 }}
                            value={drivers.driving_license_number}
                            isRequired={false}
                            onChange={(value) => handleFormDevice("driving_license_number", value)}
                            
                        />
                    </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <TextInput
                            label="Driving Lincense Validity"
                            placeholder="Driving Lincense Validity"
                            style={{ marginBottom: 24 }}
                            value={drivers.driving_license_validity}
                            isRequired={false}
                            onChange={(value) => handleFormDevice("driving_license_validity", value)}
                            
                        />
                            
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            label="Driver Score"
                            placeholder="Driver Score"
                            style={{ marginBottom: 24 }}
                            value={drivers.driver_score}
                            isRequired={false}
                            onChange={(value) => handleFormDevice("driver_score", value)}
                            
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
