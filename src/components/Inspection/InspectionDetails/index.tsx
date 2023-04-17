import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, Grid, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { transport } from "constants/RouteMiddlePath";
import { driverLicenseInfo } from "./helper";
import InspectionChecklist from "./InspectionChecklist";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppContext } from "ContextAPIs/appContext";
import {
    getDateTime,
} from "utils/calenderUtils";

//Images
import Tyre1 from "../../../assets/tyre/tyre1.png";
import Tyre2 from "../../../assets/tyre/tyre2.png";
import Tyre3 from "../../../assets/tyre/tyre3.png";
import Tyre4 from "../../../assets/tyre/tyre4.png";
import Tyre5 from "../../../assets/tyre/tyre5.png";
import Tyre6 from "../../../assets/tyre/tyre6.png";
import Tyre7 from "../../../assets/tyre/tyre7.png";


const tyresList = [
    {
        id: "1",
        src: Tyre1,
        title: "Tyre 1"
    },
    {
        id: "2",
        src: Tyre2,
        title: "Tyre 2"
    },
    {
        id: "3",
        src: Tyre3,
        title: "Tyre 3"
    },
    {
        id: "4",
        src: Tyre4,
        title: "Tyre 4"
    },
    {
        id: "5",
        src: Tyre5,
        title: "Tyre 5"
    }
    ,
    {
        id: "6",
        src: Tyre6,
        title: "Tyre 6"
    },
    {
        id: "7",
        src: Tyre7,
        title: "Tyre 7"
    }
]

const userRoles = ["service_manager", "technical_manager", "consultant"];
export function InspectionDetails() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [roleNameState, setRoleNameState] = useState("");
    const { user } = useAppContext();

    const { id } = useParams();
    const { data: inspectionDetails, isLoading } = useQuery(
        ["inspectionDetails", id],
        () => getInspectionDetails(String(id))
    );

    async function getInspectionDetails(id: string) {
        if (id) {
            return (await client.get(`${transport}/vehicle-inspections/${id}/`)).data;
        }
    }

    function GoToBack() {
        navigate(-1);
    }

    // if (isLoading) {
    //   return <LoadingScreen />;
    // }
    return (
        <Box>
            <Box className={classes.headingWrapper}>
                <Box className={classes.headingContent}>
                    <IconButton
                        className={classes.headingBackButton}
                        size="small"
                        onClick={GoToBack}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography fontSize={24} style={{ textTransform: "capitalize" }}>
                        Inpection Details
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.bodyContent}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3, lg: 3 }}
                    columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                    style={{ marginTop: 24 }}
                >
                    <Grid xs={12} sm={12} lg={4} style={{ paddingLeft: 24 }}>
                        <Box className={classes.infoBodyWrapper}>
                            <Box className={classes.bodyInfoTitle}>Vehicle No:</Box>
                            <Box
                                className={classes.bodyInfo}
                                style={{ textTransform: "capitalize" }}
                            >
                                {inspectionDetails?.vehicle_number}
                            </Box>
                        </Box>
                        <Box className={classes.infoBodyWrapper}>
                            <Box className={classes.bodyInfoTitle}>Inspection Date: </Box>
                            <Box className={classes.bodyInfo}>
                                {getDateTime(inspectionDetails?.created_at)}
                            </Box>
                        </Box>
                        <Box className={classes.infoBodyWrapper}>
                            <Box className={classes.bodyInfoTitle}>Total Score:</Box>
                            <Box className={classes.bodyInfo}>
                                {inspectionDetails?.total_vehicle_score || "-"}
                            </Box>
                        </Box>
                        <Box className={classes.infoBodyWrapper}>
                            <Box className={classes.bodyInfoTitle}>Total Penalty Amount:</Box>
                            <Box className={classes.bodyInfo}>
                                {inspectionDetails?.total_penalty_amount || "-"}
                            </Box>
                        </Box>
                        <Box className={classes.infoBodyWrapper}>
                            <Box className={classes.bodyInfoTitle}>Inspection By:</Box>
                            <Box className={classes.bodyInfo}>
                                {inspectionDetails?.transporter}
                            </Box>
                        </Box>
                        <Typography fontSize={18} style={{ textTransform: "capitalize", fontWeight: "bold" }}>
                            Inspection Images
                        </Typography>
                        <ImageList sx={{ width: "100%", height: "auto" }} cols={2} rowHeight={100}>
                            {Array.isArray(inspectionDetails?.inspection_images)
                                && inspectionDetails?.inspection_images.map((item: any) => (
                                    <ImageListItem key={item.id}>
                                        <img
                                            src={item}
                                            alt={item.title}
                                            loading="lazy"
                                        />
                                    </ImageListItem>
                                ))}
                        </ImageList>
                    </Grid>
                    <Grid xs={12} sm={12} lg={8} style={{ paddingLeft: 16 }}>
                        <InspectionChecklist inspectionId={id} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}