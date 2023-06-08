import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import TextInput from "components/commonComponent/TextInput";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import COLORS from "constants/colors";
import React, { useEffect, useRef, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from '@mui/material/Autocomplete';

// API Call
import client from "serverCommunication/client";
import { useMutation, useQuery } from "react-query";
import { auth, monitor, transport } from "constants/RouteMiddlePath";


const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    // border: "1px solid #000",
    boxShadow: 24,
    zIndex: 200,
    borderRadius: "8px"
};

interface IVehicleModal {
    closeModalHndlr: any;
    showSnackbarCallback: any;
    vehicleDetails: any;
}

const AssignDriverModal = React.forwardRef((props: IVehicleModal, ref) => {
    const [primaryDriverState, setPrimaryDriverState] = useState<any>("");
    const [seletectedDriverState, setSelectedDriverState] = useState<any>([]);
    const [driverOptionsState, setDriverOptionsState] = useState<any>([]);

    const classes = useStyles();

    const { data: driverList, isLoading: isDriverLoading } = useQuery(
        ["drivers"],
        () => getDrivers(),
        { refetchOnWindowFocus: false }
    );

    async function getDrivers() {
        let getApiUrl = `${transport}/drivers/?page=1&page_size=500`;
        const response = await client.get(getApiUrl);
        return response.data;
    }

    useEffect(() => {
        const { results } = driverList || {};
        const { associated_drivers } = props.vehicleDetails || {};
        if (Array.isArray(results)) {
            let existingSelectedDriver: Array<any> = [];
            if (Array.isArray(associated_drivers)) {
                existingSelectedDriver = associated_drivers.map((item: any) => (item.id));
            }
            let driverOptions: any[] = [],
                selectDriverOptions: any[] = [];
            for (let i in results) {
                const driverInfo = {
                    label: results[i]?.name,
                    id: results[i]?.id,
                    value: results[i]?.id,
                };
                if (existingSelectedDriver.includes(results[i]?.id)) {
                    selectDriverOptions.push(driverInfo);
                }
                driverOptions.push(driverInfo);
            }
            setDriverOptionsState(driverOptions);
            setSelectedDriverState(selectDriverOptions);
        }
    }, [driverList]);

    function onChangeHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        setPrimaryDriverState(value);
    }

    const assignDriverMutation = useMutation(generateVehicleReportApiCall, {
        onSuccess: (responseData) => {
            const { data } = responseData || {};
            props.showSnackbarCallback("success", data || "Driver is assigned successfully to vehicle.", true);
        },
        onError: () => {
            props.showSnackbarCallback("error", "Error while assigning driver.", false);
        }
    });
    async function generateVehicleReportApiCall() {
        console.log({ seletectedDriverState, primaryDriverState });
        const { vehicleDetails } = props,
            driverIds = seletectedDriverState.map((item: any) => item.id);
        const payload = {
            vehicle_id: vehicleDetails?.id,
            driver_ids: driverIds
        }
        const response = await client.post(`${transport}/vehicle-driver-map/`, payload);
        return response.data;
    }
    const { mutate: mutateAssignDriver, isLoading: generateReportLoading } = assignDriverMutation;

    function assignDriverHndlr() {
        mutateAssignDriver();
    }

    function handleSelectedDriver(selectedDriver: any, reason: any, details: any) {
        if (seletectedDriverState.length === 4 && reason === "selectOption") {
            props.showSnackbarCallback("error", "Cannot assign more that 4 driver to vehicle.", false);
            return;
        }
        if (Array.isArray(selectedDriver)) {
            const { id } = details || {};
            if (id === primaryDriverState) {
                setPrimaryDriverState("");
            }
            setSelectedDriverState(selectedDriver);
        } else {
            setPrimaryDriverState("");
            setSelectedDriverState([]);
        }
    }

    const { vehicleDetails } = props;
    return (
        <Box sx={style}>
            <Typography
                id="modal-modal-title"
                className={classes.alertHead}
                variant="h6"
                component="h2"
            >
                Assign Driver
                <i onClick={props.closeModalHndlr}>
                    <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.9" filter="url(#filter0_d_2762_100820)">
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="#fff"
                                strokeLinecap="square"
                            />
                        </g>
                        <defs>
                            <filter
                                id="filter0_d_2762_100820"
                                x="-4"
                                y="-2"
                                width="32"
                                height="32"
                                filterUnits="userSpaceOnUse"
                                colorInterpolationFilters="sRGB"
                            >
                                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                <feColorMatrix
                                    in="SourceAlpha"
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                    result="hardAlpha"
                                />
                                <feOffset dy="2" />
                                <feGaussianBlur stdDeviation="2" />
                                <feComposite in2="hardAlpha" operator="out" />
                                <feColorMatrix
                                    type="matrix"
                                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                                />
                                <feBlend
                                    mode="normal"
                                    in2="BackgroundImageFix"
                                    result="effect1_dropShadow_2762_100820"
                                />
                                <feBlend
                                    mode="normal"
                                    in="SourceGraphic"
                                    in2="effect1_dropShadow_2762_100820"
                                    result="shape"
                                />
                            </filter>
                        </defs>
                    </svg>
                </i>
            </Typography>
            <Box className={classes.reportContent}>
                {generateReportLoading && <Box className={classes.loadingDiv}>
                    <CircularProgress />
                </Box>}
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            Vehicle
                        </Typography>
                        <TextField
                            id="vehicleId"
                            name="vehicleId"
                            type="text"
                            sx={{ width: "100%" }}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            disabled={true}
                            value={vehicleDetails?.vin}
                            onChange={undefined}
                        />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: 16 }}>
                        <Typography
                            fontSize={16}
                            style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                        >
                            Select Driver
                        </Typography>
                        <Autocomplete
                            multiple
                            id="combo-box-demo"
                            value={seletectedDriverState}
                            getOptionLabel={(option) => option.label}
                            filterSelectedOptions
                            renderOption={(props, option) => {
                                return (
                                    <li {...props} key={option.id}>
                                        {option.label}
                                    </li>
                                );
                            }}
                            options={Array.isArray(driverOptionsState) ? driverOptionsState : []}
                            onChange={(e: any, value: any, reason: any, details: any) => {
                                handleSelectedDriver(value, reason, details);
                            }}
                            sx={{ width: "100%" }}
                            renderInput={(params) => (
                                <TextField {...params}
                                />
                            )}
                        />
                    </Grid>
                    {Array.isArray(seletectedDriverState) && seletectedDriverState.length > 0
                        && <Grid item xs={12} style={{ marginBottom: 16 }}>
                            <Typography
                                fontSize={16}
                                style={{ fontWeight: 200, marginBottom: 8, marginRight: 2 }}
                            >
                                Select Primary Driver
                            </Typography>
                            <RadioGroup
                                row
                                name="primary-driver"
                                value={primaryDriverState}
                                onChange={onChangeHndlr}
                            >
                                {
                                    seletectedDriverState.map((item: any) => {
                                        return (
                                            <FormControlLabel key={`driver-${item.id}`} value={item.id} control={< Radio />} label={item.label} />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </Grid>}
                    <Grid item xs={12} style={{ marginTop: 8 }}>
                        <Box style={{ display: "flex", justifyContent: "end" }}>
                            <Button className="cBtn" onClick={props.closeModalHndlr}>
                                Cancel
                            </Button>
                            <Button
                                className="gbtn"
                                variant="contained"
                                style={{ color: COLORS.WHITE }}
                                onClick={assignDriverHndlr}
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </Box>
        </Box >
    )
})

export default AssignDriverModal;

