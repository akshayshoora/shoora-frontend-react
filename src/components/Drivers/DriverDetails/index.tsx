import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { transport } from "constants/RouteMiddlePath";

export function DriverDetails() {
    const classes = useStyles();
    const navigate = useNavigate();

    const { id } = useParams();

    const { data: driverDetails, isLoading } = useQuery(["driverDetail", id], () =>
        getDriverDetails(String(id))
    );

    async function getDriverDetails(id: string) {
        return (await client.get(`${transport}/drivers/${id}/`)).data;
    }


    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Box>
            <Box className={classes.headingWrapper}>
                <Box className={classes.headingContent}>
               
                <Typography fontSize={24} style={{ textTransform: "capitalize" }}>{driverDetails.name}</Typography>
                </Box>
                <Box>
                <Button
                    variant="outlined"
                    onClick={() =>
                    navigate(`/${AppPaths.DRIVERS}/${SubPaths.EDIT}/${id}`)
                    }
                >
                    Edit Driver Details
                </Button>
                </Box>
            </Box>
            <Box className={classes.bodyContent}>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Name:</Box>
                <Box className={classes.bodyInfo} style={{ textTransform: "capitalize" }}>{driverDetails.name}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Phone Number:</Box>
                <Box className={classes.bodyInfo}>{driverDetails.phone_number}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Passport Number:</Box>
                <Box className={classes.bodyInfo}>{driverDetails.passport_number}</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Passport Validity:</Box>
                <Box className={classes.bodyInfo}>
                    {driverDetails.passport_validity }
                </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Driving License Number:</Box>
                <Box className={classes.bodyInfo}>
                    {driverDetails.driving_license_number}
                </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}>Driving License Validity:</Box>
                <Box className={classes.bodyInfo} >
                    {driverDetails.driving_license_validity}
                </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                <Box className={classes.bodyInfoTitle}> Driver Score:</Box>
                <Box className={classes.bodyInfo}>
                    {driverDetails.driver_score}
                </Box>
                </Box>

                <Box className={classes.infoBodyWrapper}>
                    <Box className={classes.bodyInfoTitle}> Vehicle:</Box>
                    <Box className={classes.bodyInfo}>
                        {driverDetails.vehicle?driverDetails.vehicle:'-'}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
