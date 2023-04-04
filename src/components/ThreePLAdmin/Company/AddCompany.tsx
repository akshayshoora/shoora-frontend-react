import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./modalstyle";
import TextInput from "components/commonComponent/TextInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import COLORS from "constants/colors";
import React, { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
// API Call
import client from "serverCommunication/client";
import { useMutation, useQuery } from "react-query";
import { auth, monitor, transport } from "constants/RouteMiddlePath";
//Icon
import ClearIcon from '@mui/icons-material/Clear';

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    zIndex: 200,
    borderRadius: "8px"
};

interface IDriverModal {
    closeModalHndlr: any;
    showSnackbarCallback: any;
}

const AddCompany = React.forwardRef((props: IDriverModal, ref) => {
    const [addCompanyState, setAddCompanyState] = useState({
        companyName: ""
    });
    const classes = useStyles();

    async function getDrivers() {
        let getApiUrl = `${transport}/drivers/`;
        const response = await client.get(getApiUrl);
        return response.data;
    }

    function closeModalHndlr() {

    }
    function onChangeHndlr(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setAddCompanyState(prevState => ({ ...prevState, [name]: value }));
    }

    const drivingHistoryMutation = useMutation(generateDriverReportApiCall, {
        onSuccess: (responseData) => {
            const { data } = responseData || {};
            props.showSnackbarCallback("success", data || "Driver report sended successfully.", true);
        },
        onError: () => {
            props.showSnackbarCallback("error", "Error while sending driver report.", false);
        }
    });
    async function generateDriverReportApiCall() {
        const { companyName } = addCompanyState;
        const response = await client.get(`${monitor}/trips/download`);
        return response.data;
    }
    const { mutate: mutateDrivingHistory, isLoading: generateReportLoading } = drivingHistoryMutation;

    function generateReportHndlr() {
        mutateDrivingHistory();
    }

    return (
        <Box sx={style}>
            <Typography
                id="modal-modal-title"
                className={classes.alertHead}
                component="h2"
            >
                Update Company
                <ClearIcon className="closeIcon" onClick={props.closeModalHndlr} />
            </Typography>
            <Box className={classes.reportContent}>
                {generateReportLoading && <Box className={classes.loadingDiv}>
                    <CircularProgress />
                </Box>}
                <Grid container columnSpacing={3}>
                    <Grid item xs={12} style={{ marginBottom: 24 }}>
                        <Typography
                            fontSize={14}
                            style={{ fontWeight: 400, marginBottom: 10, marginRight: 2 }}
                        >
                            Company Name
                        </Typography>
                        <TextField
                            id="companyName"
                            name="companyName"
                            type="text"
                            sx={{ width: "100%" }}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={"Testing Company"}
                            onChange={onChangeHndlr}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box style={{ display: "flex", justifyContent: "end" }}>
                            <Button className="cBtn" onClick={props.closeModalHndlr}>
                                Cancel
                            </Button>
                            <Button
                                className="gbtn"
                                variant="contained"
                                style={{ color: COLORS.WHITE }}
                                onClick={generateReportHndlr}
                            >
                                Update
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box >
    )
})

export default AddCompany;

