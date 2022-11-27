import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { transport } from "constants/RouteMiddlePath";

export function DeviceDetails() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { id } = useParams();

    const { data: device, isLoading } = useQuery(["devices", id], () =>
        getDeviceDetails(String(id))
    );

    async function getDeviceDetails(id: string) {
        return (await client.get(`${transport}/devices/${id}/`)).data;
    }


    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <Box className={classes.headingWrapper}>
                <Box className={classes.headingContent}>
               
                <Typography fontSize={24} style={{ textTransform: "capitalize" }}>{device.device_type}</Typography>
                </Box>
            </Box>
            <Box className={classes.bodyContent}>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Device Type:</Box>
                <Box className={classes.bodyInfo} style={{ textTransform: "capitalize" }}>{device.device_type}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Device ID:</Box>
                <Box className={classes.bodyInfo}>{device.id}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Organisation:</Box>
                <Box className={classes.bodyInfo}>{device.organization}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Assigned to Vehicle:</Box>
                <Box className={classes.bodyInfo}>
                    {device.is_assigned_to_vehicle ? device.is_assigned_to_vehicle : "-"}
                </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Activation Date:</Box>
                <Box className={classes.bodyInfo}>
                    {device.activation_date ? device.activation_date : "-"}
                </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Sim Number:</Box>
                <Box className={classes.bodyInfo} >
                    {device.sim_number ? device.sim_number : "-"}
                </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}> IMEI Number:</Box>
                <Box className={classes.bodyInfo}>
                    {device.imei_number ? device.imei_number : "-"}
                </Box>
                </Box>
            </Box>
        </Box>
    );
}
