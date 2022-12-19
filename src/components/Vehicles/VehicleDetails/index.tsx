import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { auth,transport } from "constants/RouteMiddlePath";

export function VehicleDetails() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { id } = useParams();

    const { data: vehicle, isLoading } = useQuery(["vehicle_details", id], () =>
        getVehicleDetails(String(id))
    );

    async function getVehicleDetails(id: string) {
        return (await client.get(`${transport}/vehicles/${id}/`)).data;
    }


    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <Box className={classes.headingWrapper}>
                <Box className={classes.headingContent}>
               
                <Typography fontSize={24} style={{ textTransform: "capitalize" }}>{vehicle.vehicle_type}</Typography>
                </Box>
            </Box>
            <Box className={classes.bodyContent}>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Vehicle Type:</Box>
                <Box className={classes.bodyInfo} style={{ textTransform: "capitalize" }}>{vehicle.vehicle_type}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Vehicle ID:</Box>
                <Box className={classes.bodyInfo}>{vehicle.id}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Made By:</Box>
                <Box className={classes.bodyInfo}>{vehicle.make}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Model:</Box>
                <Box className={classes.bodyInfo}>
                    {vehicle.model ? vehicle.model : "-"}
                </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Vehicle Number:</Box>
                <Box className={classes.bodyInfo}>
                    {vehicle.vin ? vehicle.vin : "-"}
                </Box>
                </Box>
               </Box>
        </Box>
    );
}
