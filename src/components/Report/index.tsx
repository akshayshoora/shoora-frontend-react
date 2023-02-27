import React, { useCallback, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Chip from "@mui/material/Chip";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAppContext } from "ContextAPIs/appContext";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
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

import { auth, transport } from "constants/RouteMiddlePath";
import client from "serverCommunication/client";
//Modal
import VehicleReportModal from "./VehicleReportModal";
import DriverReportModal from "./DriverReportModal";
import DriverDutyHoursModal from "./DriverDutyHoursModal";
import VehicleHaltModal from "./VehicleHaltModal";
import DriverTripModal from "./DriverTripModal";
import VehicleTripModal from "./VehicleTripModal";
import TripBetweenGeofenceModal from "./TripBetweenGeofenceModal";
import { reportList } from "./helper";

function getActiveModalComponent(modalId: string) {
  switch (modalId) {
    case "vehicle-halt-report":
      return VehicleHaltModal;
    case "driver-trip-report":
      return DriverTripModal;
    case "vehicle-trip-report":
      return VehicleTripModal;
    case "driver-duty-hours":
      return DriverDutyHoursModal;
    case "trip-between-geofence":
      return TripBetweenGeofenceModal;
    default:
      return null;
  }
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
}));
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

  const closeModalHndlr = useCallback((event?: any, reason?: any) => {
    if (reason === "backdropClick") {
      return;
    }
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

  async function vehicleReportMasterHndlr() {
    try {
      const vehicleCsvData = await client.get(`${transport}/vehicles/download/`);
      const currentDate = new Date().toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(vehicleCsvData.data);
      hiddenElement.target = '_blank';
      hiddenElement.download = `vehicle-report-${currentDate}.csv`;
      hiddenElement.click();
    }
    catch (e) {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    }
  }
  async function driverReportMasterHndlr() {
    try {
      const driverCsvData = await client.get(`${transport}/drivers/download/`);
      const currentDate = new Date().toLocaleString("default", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(driverCsvData.data);
      hiddenElement.target = '_blank';
      hiddenElement.download = `driver-report-${currentDate}.csv`;
      hiddenElement.click();
    } catch (e) {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    }
  }

  function onBackdropHndlr(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  async function downloadGeneratedReportHndlr(reportDetails: any) {
    if (reportDetails) {
      const { url, reportName, filter, requireFilter } = reportDetails;
      try {
        let params = { params: undefined };
        if (requireFilter) {
          params = { params: filter };
        }
        const driverCsvData = await client.get(url, params);
        const currentDate = new Date().toLocaleString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(driverCsvData.data);
        hiddenElement.target = '_blank';
        hiddenElement.download = `${reportName}-${currentDate}.csv`;
        hiddenElement.click();
      } catch (e) {
        setSnackbar({
          open: true,
          variant: "error",
          message: "Something went wrong.",
        })
      }
    }
  }

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
      <Box style={{ padding: "0px 0px 20px 40px" }}>
        <Grid container
          columns={{ xs: 6, sm: 8, md: 12, lg: 15 }}>
          <Grid item xs={6} md={8} lg={10} style={{ marginTop: "20px", paddingRight: "24px" }}>
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
                    spacing={{ xs: 2, md: 3, lg: 3 }}
                    columns={{ xs: 6, sm: 8, md: 12, lg: 12 }}
                    style={{ marginTop: 4 }}
                  >
                    <Grid item xs={2} sm={6} md={6} lg={4} style={{ paddingLeft: 24 }}>
                      <Box className="reportBox">
                        <Box sx={{ padding: "20px" }}>
                          <h3>Vehicle Halt Report</h3>
                          <p>
                            Vehicle halt report captures the stappages of a vehicle over a particular duration and the location of the stoppage.
                          </p>
                          <p>Last Generated on: </p>
                        </Box>

                        <div className="btnWrapper">
                          <Button
                            className="gbtn"
                            variant="contained"
                            style={{ color: COLORS.WHITE }}
                            onClick={handleOpen}
                            data-id="vehicle-halt-report"
                          >
                            <AddIcon /> Generate Report
                          </Button>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={2} sm={6} md={6} lg={4} style={{ paddingLeft: 24 }}>
                      <Box className="reportBox">
                        <Box sx={{ padding: "20px" }}>
                          <h3>Driver Trip Report</h3>
                          <p>
                            Driver trip report captures the runnings of a driver from point A to point B with the count of incidents and distance travelled.
                          </p>
                          <p>Last Generated on: </p>
                        </Box>

                        <div className="btnWrapper">
                          <Button
                            className="gbtn"
                            variant="contained"
                            style={{ color: COLORS.WHITE }}
                            onClick={handleOpen}
                            data-id="driver-trip-report"
                          >
                            <AddIcon /> Generate Report
                          </Button>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={2} sm={6} md={6} lg={4} style={{ paddingLeft: 24 }}>
                      <Box className="reportBox">
                        <Box sx={{ padding: "20px" }}>
                          <h3>Vehicle Trip Report</h3>
                          <p>
                            Vehicle trip report captures the runnings of a vehicle from point A to point B with the count of incidents and distance travelled.
                          </p>
                          <p>Last Generated on: </p>
                        </Box>

                        <div className="btnWrapper">
                          <Button
                            className="gbtn"
                            variant="contained"
                            style={{ color: COLORS.WHITE }}
                            onClick={handleOpen}
                            data-id="vehicle-trip-report"
                          >
                            <AddIcon /> Generate Report
                          </Button>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={2} sm={6} md={6} lg={4} style={{ paddingLeft: 24 }}>
                      <Box className="reportBox">
                        <Box sx={{ padding: "20px" }}>
                          <h3>Driver Report Master</h3>
                          <p>
                            Master data of all drivers in the organisation with their overall score and driving/duty hours for today and yesterday.
                          </p>
                          <p>Last Generated on: </p>
                        </Box>

                        <div className="btnWrapper">
                          <Button
                            className="gbtn"
                            variant="contained"
                            style={{ color: COLORS.WHITE }}
                            onClick={driverReportMasterHndlr}
                            data-id="driver-report-master"
                          >
                            <AddIcon /> Download Now
                          </Button>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={2} sm={6} md={6} lg={4} style={{ paddingLeft: 24 }}>
                      <Box className="reportBox">
                        <Box sx={{ padding: "20px" }}>
                          <h3>Driver Duty Hour Report</h3>
                          <p>
                            Driving and Duty hours for a particular driver for n number of historic days
                          </p>
                          <p>Last Generated on: </p>
                        </Box>

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
                    <Grid item xs={2} sm={6} md={6} lg={4} style={{ paddingLeft: 24 }}>
                      <Box className="reportBox">
                        <Box sx={{ padding: "20px" }}>
                          <h3>Vehicle Report Master</h3>
                          <p>
                            Master data of all vehicles capturing all critical information including data from Parivahan
                          </p>
                          <p>Last Generated on: </p>
                        </Box>

                        <div className="btnWrapper">
                          <Button
                            className="gbtn"
                            variant="contained"
                            style={{ color: COLORS.WHITE }}
                            onClick={vehicleReportMasterHndlr}
                            data-id="vehicle-report-master"
                          >
                            <AddIcon /> Download Now
                          </Button>
                        </div>
                      </Box>
                    </Grid>
                    <Grid item xs={2} sm={6} md={6} lg={4} style={{ paddingLeft: 24 }}>
                      <Box className="reportBox">
                        <Box sx={{ padding: "20px" }}>
                          <h3>Trip Between Geofence</h3>
                          <p>
                            No of trips concluded by all vehicles between two points of interest
                          </p>
                          <p>Last Generated on: </p>
                        </Box>

                        <div className="btnWrapper">
                          <Button
                            className="gbtn"
                            variant="contained"
                            style={{ color: COLORS.WHITE }}
                            onClick={handleOpen}
                            data-id="trip-between-geofence"
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
          </Grid>
          <Grid item xs={6} md={4} lg={5} className={classes.generatedReportContainer}>
            <Box>
              <Box className={classes.recentReportHeader}>
                <Heading>Recently Generated Reports</Heading>
              </Box>
              {Array.isArray(reportList) && reportList.map((item, index) => (
                <React.Fragment key={`item-${index}`}>
                  <Box className={classes.recentReportCard}>
                    <Box className="header">
                      <Typography variant="h3">{item?.reportName}</Typography>
                      <Box className="header-action">
                        <IconButton data-id={item?.id} onClick={() => downloadGeneratedReportHndlr(item)} size="small" aria-label="download">
                          <ArrowDownwardIcon />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box className="recentBodyContainer">
                      <Box sx={{ mb: 2 }} className="generatedDate">
                        <Box component="span" className="label-light">Generated on: </Box>
                        <Box component="span" className="label-dark">{item?.generatedOn}</Box>
                      </Box>
                      <Box sx={{ mb: 0.5 }} className="label-dark">Date Range:</Box>
                      <Box className="dateRangeContainer">
                        <Box className="generatedDate">
                          <Box component="span" className="label-light">From: </Box>
                          <Box component="span" className="label-dark">{item?.fromDate}</Box>
                        </Box>
                        <Box className="generatedDate">
                          <Box component="span" className="label-light">To: </Box>
                          <Box component="span" className="label-dark">{item?.toDate}</Box>
                        </Box>
                      </Box>
                    </Box></Box>
                </React.Fragment>
              ))}
            </Box>
          </Grid>
        </Grid>

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
    </>
  );
}
