import React, { useState } from "react";
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
import { Button, CircularProgress, Modal, InputLabel } from "@mui/material";
import SearchBox from "components/commonComponent/SearchField";
import COLORS from "constants/colors";
import style from "./style";
import { text } from "stream/consumers";
import TextInput from "components/commonComponent/TextInput";

export default function Report() {
  const [searchText, setSearchText] = useState("");

  const classes = useStyles();
  const { user } = useAppContext();
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
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
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleFormUser(){
    return;
  }


  return (
    <Box style={{ padding: "20px 40px" }}>

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>My Reports</Heading>
        </Box>
        <Box>
        {/* <CircularProgress /> */}
        <Box className={classes.searchWrapper}>
        <Heading>Generate a New Report</Heading>
        <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search"
            />
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
            <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                <Box className="reportBox">
                  <h3>Event Report</h3>
                  <p>Event Report provides us you with the list of events of the vehicle throughout the specified date range set by you.</p>
                  <p>Last Generated on: </p>
                  <h4>Report not generated <br />yet</h4>

                 <div className="btnWrapper"> 
                 <Button className="gbtn" variant="contained" style={{ color:COLORS.WHITE }} onClick={handleOpen}>
                    <AddIcon /> Generate Report 
                </Button>
                </div>
                </Box>
            </Grid>
            <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                <Box className="reportBox">
                  <h3>Trip Report</h3>
                  <p>Event Report provides us you with the list of events of the vehicle throughout the specified date range set by you.</p>
                  <p>Last Generated on: </p>
                  <h4>Report not generated <br />yet</h4>
                 
                  <div className="btnWrapper"> 
                  <Button className="gbtn" variant="contained" style={{ color:COLORS.WHITE }}  onClick={handleOpen}>
                    <AddIcon /> Generate Report 
                </Button>
                </div>
                </Box>
            </Grid>
            <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                <Box className="reportBox">
                  <h3>Trip Report</h3>
                  <p>Event Report provides us you with the list of events of the vehicle throughout the specified date range set by you.</p>
                  <p>Last Generated on: </p>
                  <h4>Report not generated <br />yet</h4>
                 
                  <div className="btnWrapper"> 
                  <Button className="gbtn" variant="contained" style={{ color:COLORS.WHITE }}  onClick={handleOpen}>
                    <AddIcon /> Generate Report 
                </Button>
                </div>
                </Box>
            </Grid>
            <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                <Box className="reportBox">
                  <h3>Trip Report</h3>
                  <p>Event Report provides us you with the list of events of the vehicle throughout the specified date range set by you.</p>
                  <p>Last Generated on: </p>
                  <h4>Report not generated <br />yet</h4>
                 
                  <div className="btnWrapper"> 
                  <Button className="gbtn" variant="contained" style={{ color:COLORS.WHITE }}  onClick={handleOpen}>
                    <AddIcon /> Generate Report 
                </Button>
                </div>
                </Box>
            </Grid>
            <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                <Box className="reportBox">
                  <h3>Trip Report</h3>
                  <p>Event Report provides us you with the list of events of the vehicle throughout the specified date range set by you.</p>
                  <p>Last Generated on: </p>
                  <h4>Report not generated <br />yet</h4>
                 
                  <div className="btnWrapper"> 
                  <Button className="gbtn" variant="contained" style={{ color:COLORS.WHITE }}  onClick={handleOpen}>
                    <AddIcon /> Generate Report 
                </Button>
                </div>
                </Box>
            </Grid>
            <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
                <Box className="reportBox">
                  <h3>Trip Report</h3>
                  <p>Event Report provides us you with the list of events of the vehicle throughout the specified date range set by you.</p>
                  <p>Last Generated on: </p>
                  <h4>Report not generated <br />yet</h4>
                 
                  <div className="btnWrapper"> 
                  <Button className="gbtn" variant="contained" style={{ color:COLORS.WHITE }}  onClick={handleOpen}>
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
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
         <Box sx={style}>
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
        <Grid style={{ marginBottom: 24 }}>
            <TextInput
                label="Date Range"
                placeholder="12 Dec 2022 12:00 AM - 12 Dec 2022 12:00 AM -"
                value=""
                isRequired={false}
                onChange={(value) => handleFormUser()}
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
          <Button className="cBtn" onClick={handleClose}>Cancel</Button>
          <Button className="gbtn" variant="contained" style={{ color:COLORS.WHITE }}>Generate Report</Button>
        </Box>
        </Box>
        </Box>
      </Modal>
    </Box>
  );
}
