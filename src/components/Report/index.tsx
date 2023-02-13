import React, { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Chip from "@mui/material/Chip";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAppContext } from "ContextAPIs/appContext";
import {
  Button,
  CircularProgress,
  Modal,
  InputLabel,
  TextField,
} from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import SearchBox from "components/commonComponent/SearchField";
import COLORS from "constants/colors";
import style from "./style";
import { text } from "stream/consumers";
import TextInput from "components/commonComponent/TextInput";

//Modal
import VehicleReportModal from "./VehicleReportModal";
import DriverReportModal from "./DriverReportModal";
import DriverDutyHoursModal from "./DriverDutyHoursModal";

function getActiveModalComponent(modalId: string) {
  switch (modalId) {
    case "vehicle-report":
      return VehicleReportModal;
    case "driver-report":
      return DriverReportModal;
    case "driver-duty-hours":
      return DriverDutyHoursModal;
    default:
      return null;
  }
}
type ISnackbarVariant = "success" | "error" | "info";
export default function Report() {
  const [searchText, setSearchText] = useState("");
  const [modalState, setActiveModalState] = useState({
    activeModalId: "",
    showModal: false
  });
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: ISnackbarVariant;
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const classes = useStyles();
  const { user } = useAppContext();
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    position: "relative",
    boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
  }));

  const [open, setOpen] = useState(false);
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    const modalId = event.currentTarget.getAttribute("data-id");
    if (modalId) {
      setActiveModalState({
        showModal: true,
        activeModalId: modalId
      })
    }
    // setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleFormUser() {
    return;
  }

  const closeModalHndlr = useCallback(() => {
    setActiveModalState({
      showModal: false,
      activeModalId: ""
    })
  }, []);

  const showSnackbarCallback = useCallback((type: ISnackbarVariant, message: string, closeModal: boolean) => {
    setSnackbar({
      open: true,
      variant: type,
      message,
    });
    if (closeModal) {
      closeModalHndlr();
    }
  }, []);

  const activeModalComponent: any = useMemo(() => {
    const { activeModalId } = modalState,
      ModalComponent: any = getActiveModalComponent(activeModalId);
    if (ModalComponent) {
      return <ModalComponent modalId={activeModalId} closeModalHndlr={closeModalHndlr}
        showSnackbarCallback={showSnackbarCallback} />
    }
    return null;
  }, [modalState.activeModalId, closeModalHndlr, showSnackbarCallback]);

  return (
    <>
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
      <Box style={{ padding: "20px 40px" }}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading>My Reports</Heading>
        </Box>
        <Box>
          {/* <CircularProgress /> */}
          <Box className={classes.searchWrapper}>
            <Heading>Generate a New Report</Heading>
            <SearchBox onChangeFunc={handleSearchInput} placeholder="Search" />
          </Box>
          <Box className={classes.allReports}>
            <span>All Reports</span>
            <Box className={classes.allReportView}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 6, sm: 8, md: 12 }}
                style={{ marginTop: 24 }}
              >
                <Grid item xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                  <Box className="reportBox">
                    <h3>Vehicle Report</h3>
                    <p>
                      Event Report provides us you with the list of events of the
                      vehicle throughout the specified date range set by you.
                    </p>
                    <p>Last Generated on: </p>
                    <h4>
                      Report not generated <br />
                      yet
                    </h4>

                    <div className="btnWrapper">
                      <Button
                        className="gbtn"
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        onClick={handleOpen}
                        data-id="vehicle-report"
                      >
                        <AddIcon /> Generate Report
                      </Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                  <Box className="reportBox">
                    <h3>Driver Report</h3>
                    <p>
                      Event Report provides us you with the list of events of the
                      vehicle throughout the specified date range set by you.
                    </p>
                    <p>Last Generated on: </p>
                    <h4>
                      Report not generated <br />
                      yet
                    </h4>

                    <div className="btnWrapper">
                      <Button
                        className="gbtn"
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        data-id="driver-report"
                        onClick={handleOpen}
                      >
                        <AddIcon /> Generate Report
                      </Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                  <Box className="reportBox">
                    <h3>Driver Duty Hours Report</h3>
                    <p>
                      Event Report provides us you with the list of events of the
                      vehicle throughout the specified date range set by you.
                    </p>
                    <p>Last Generated on: </p>
                    <h4>
                      Report not generated <br />
                      yet
                    </h4>

                    <div className="btnWrapper">
                      <Button
                        className="gbtn"
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        onClick={handleOpen}
                        data-id="driver-duty-hours"
                      >
                        <AddIcon /> Generate Report
                      </Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                  <Box className="reportBox">
                    <h3>Trip Report</h3>
                    <p>
                      Event Report provides us you with the list of events of the
                      vehicle throughout the specified date range set by you.
                    </p>
                    <p>Last Generated on: </p>
                    <h4>
                      Report not generated <br />
                      yet
                    </h4>

                    <div className="btnWrapper">
                      <Button
                        className="gbtn"
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        onClick={handleOpen}
                      >
                        <AddIcon /> Generate Report
                      </Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                  <Box className="reportBox">
                    <h3>Trip Report</h3>
                    <p>
                      Event Report provides us you with the list of events of the
                      vehicle throughout the specified date range set by you.
                    </p>
                    <p>Last Generated on: </p>
                    <h4>
                      Report not generated <br />
                      yet
                    </h4>

                    <div className="btnWrapper">
                      <Button
                        className="gbtn"
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        onClick={handleOpen}
                      >
                        <AddIcon /> Generate Report
                      </Button>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                  <Box className="reportBox">
                    <h3>Trip Report</h3>
                    <p>
                      Event Report provides us you with the list of events of the
                      vehicle throughout the specified date range set by you.
                    </p>
                    <p>Last Generated on: </p>
                    <h4>
                      Report not generated <br />
                      yet
                    </h4>

                    <div className="btnWrapper">
                      <Button
                        className="gbtn"
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        onClick={handleOpen}
                      >
                        <AddIcon /> Generate Report
                      </Button>
                    </div>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
        <Modal
          open={modalState.showModal}
          onClose={closeModalHndlr}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          {/* <VehicleReportModal /> */}
          <>
            {activeModalComponent}
          </>
        </Modal>
      </Box>
    </>
  );
}


{/* <Box sx={style}>
  <Typography
    id="modal-modal-title"
    className={classes.alertHead}
    variant="h6"
    component="h2"
  >
    Event Report
    <i onClick={handleClose}>
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
            stroke-linecap="square"
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
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
    <Grid style={{ marginBottom: 24 }}>
      <TextInput
        label="Enter Report Name (Optional)"
        placeholder=""
        value=""
        isRequired={false}
        onChange={(value) => handleFormUser()}
      />
      <small>You can give this report a custom name</small>
    </Grid>
    <Grid style={{ marginBottom: 24 }} className={classes.reportDate}>
      <TextField
        id="datetime-local1"
        type="datetime-local"
        defaultValue="2023-01-02T09:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="datetime-local2"
        type="datetime-local"
        defaultValue="2023-02-02T10:30"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
    <Grid style={{ marginBottom: 24 }}>
      <TextInput
        label="Enter Email Address"
        placeholder=""
        value=""
        isRequired={false}
        onChange={(value) => handleFormUser()}
      />
    </Grid>
    <Box>
      <Button className="cBtn" onClick={handleClose}>
        Cancel
      </Button>
      <Button
        className="gbtn"
        variant="contained"
        style={{ color: COLORS.WHITE }}
      >
        Generate Report
      </Button>
    </Box>
  </Box>
</Box> */}