import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  Snackbar,
  InputLabel,
  Select,
  TableRow,
  MenuItem,
  Alert,
  TableBody,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import GoogleMap from "components/Map/GoogleMap";
import mapIcon from "../../assets/location.png";
import { monitor, transport } from "constants/RouteMiddlePath";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import { Button, List, ListItemText, SelectChangeEvent } from "@mui/material";
import SerachIcon from "../../assets/search-icon.png";
import notFound from "../../assets/404.jpg";
import Table from "@mui/material/Table";
import { TableFooter } from "components/commonComponent/Table";
import MapMarker from "components/MapMarker";
import { LockClock } from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4, 2, 2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
}));


function getVehicleStatusTooltipTitle(vehicleStatus: string) {
  const statusValue = vehicleStatus?.toLowerCase() || "";
  switch (statusValue) {
    case "moving":
      return "Moving";
    case "stopped":
      return "Stopped";
    case "idle":
      return "Idle";
    default:
      return "Offline"
  }
}


function getVehicleStatusLabelClassName(vehicleStatus: string) {
  const statusValue = vehicleStatus?.toLowerCase() || "";
  switch (statusValue) {
    case "moving":
      return "moving-vehicle";
    case "stopped":
      return "stopped-vehicle";
    case "idle":
      return "idle-vehicle";
    default:
      return "offline-vehicle"
  }
}
export default function MapView() {
  const [selectStatus, setSelectStatus] = useState("");
  const [visibleVehicleState, setVisibleVehicleState] = useState<any>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectStatus(event.target.value as string);
    setDeviceId("");
  };
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deviceId, setDeviceId] = useState("");
  const [locationList, setLocationList] = useState<any[]>([]);

  const [showMapOption, setShowMapOption] = useState<boolean>(false);
  const [mapOption, setMapOption] = useState<number>(0);

  const handleMapOption = () => {
    setShowMapOption(!showMapOption);
  };

  const { data: vehicleList, isLoading: isVehicleLoading } = useQuery(
    ["vehiclelist", searchText, selectStatus],
    () => getVehicles(searchText, selectStatus),
    { refetchOnWindowFocus: false }
  );

  async function getVehicles(searchText?: string, selectStatus?: string) {
    let getApiUrl = `${transport}/vehicles-current-locations/?search=${searchText}&status=${selectStatus}`;
    const response = await client.get(getApiUrl);
    showTableVehicleListHnldr(0, rowsPerPage, response?.data?.results);
    setPage(0);
    return response.data;
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    showTableVehicleListHnldr(newPage - 1, rowsPerPage, vehicleList?.results);
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleVehicleView = (id: string, status: string) => {
    if (status != "moving") {
      setSnackbar({
        open: true,
        variant: "error",
        message: "vehicle is not moving",
      });
      return;
    }
    setDeviceId(id);
  };

  function showTableVehicleListHnldr(
    page: any,
    rowPerPage: any,
    vehicleList: any
  ) {
    if (Array.isArray(vehicleList)) {
      const startIndex = rowPerPage * page,
        lastIndex =
          page * rowPerPage + rowPerPage < vehicleList.length
            ? page * rowPerPage + rowPerPage
            : vehicleList.length;
      setVisibleVehicleState(vehicleList.slice(startIndex, lastIndex));
    }
  }

  return (
    <Box style={{ padding: "20px 0 0 25px" }}>
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
      <Box>
        <Heading>Map View</Heading>
        <Box className={classes.live}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 6, sm: 8, md: 12 }}
            style={{ marginTop: 24 }}
          >
            <Grid  item xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
              <Item elevation={1}>
                <Box className="contentMain">
                  <Box className="searchbar" style={{ padding: "20px 15px" }}>
                    <input
                      className="searchField"
                      placeholder="Search Vehicle ID"
                      type="search"
                      onChange={(e) => {
                        setSearchText(e.target.value);
                      }}
                    />
                    <Button className="searchBtn">
                      <img src={SerachIcon} height={24} width={24} alt="" />
                    </Button>
                  </Box>
                  {/* <List component="nav" aria-label="search user">
                    <ListItemText primary="All" />
                    <ListItemText primary="Active assets" />
                    <ListItemText primary="Unreachable Assets" />
                    <ListItemText primary="Inactive assets" />
                  </List> */}
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select Filter
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectStatus}
                      label="selectFilter"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>All</MenuItem>
                      <MenuItem value={"moving"}>Moving</MenuItem>
                      <MenuItem value={"idle"}>Idle</MenuItem>
                      <MenuItem value={"stopped"}>Stopped</MenuItem>
                      <MenuItem value={"offline"}>Offline</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <Box className={classes.hoverCardContainer}>
                    <Box className={classes.hoverCard}>
                      <Box className={classes.vehicleNumberInfo}>HR432432</Box>
                      <Box sx={{ display: "flex", mb: 0.3 }}>
                        <Box className={classes.hoverCardLabel} sx={{ fontWeight: "bold", mr: 0.5 }}>Driver: </Box>
                        <Box>Driver Name</Box>
                      </Box>
                      <Box sx={{ display: "flex", mb: 0.3 }}>
                        <Box className={classes.hoverCardLabel} sx={{ fontWeight: "bold", mr: 0.5 }}>Status: </Box>
                        <Box>
                          <Tooltip title={"Active"}>
                            <i className={`circle moving-vehicle`}></i>
                          </Tooltip>
                          Moving
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", mb: 0.3 }}>
                        <Box className={classes.hoverCardLabel} sx={{ fontWeight: "bold", mr: 0.5 }}>Time: </Box>
                        <Box>03H 30M</Box>
                      </Box>
                      <Box sx={{ display: "flex", mb: 0.3 }}>
                        <Box className={classes.hoverCardLabel} sx={{ fontWeight: "bold", mr: 0.5 }}>Address: </Box>
                        <Box>
                          This is the address details
                        </Box>
                      </Box>

                    </Box>
                  </Box> */}
                  <Box className="notfound">
                    <div className="contendata">
                      {!isVehicleLoading && (
                        <div>
                          <Table>
                            <TableBody>
                              {Array.isArray(visibleVehicleState) &&
                                visibleVehicleState.map((item: any) => (
                                  <TableRow key={item.id}>
                                    <td
                                      className="loaddata"
                                      style={
                                        deviceId == item.device
                                          ? { background: "#fef8f0" }
                                          : {}
                                      }
                                      onClick={() =>
                                        handleVehicleView(
                                          item.device,
                                          item.status
                                        )
                                      }
                                    >
                                      <Tooltip title={getVehicleStatusTooltipTitle(item.status)}>
                                        <i className={`circle ${getVehicleStatusLabelClassName(item.status)}`}></i>
                                      </Tooltip>
                                      <span className="trackid">
                                        {item.vin}
                                      </span>
                                      <span className="arrowright">
                                        <svg
                                          width="17"
                                          height="15"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M15.75 7.726h-15M9.7 1.701l6.05 6.024L9.7 13.75"
                                            stroke={
                                              item.status !== "moving"
                                                ? "#D3D3D3"
                                                : "#3BB3C3"
                                            }
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </span>
                                    </td>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                          <Box
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              paddingBottom: "20px",
                            }}
                          >
                            <TableFooter
                              totalPages={Math.ceil(
                                vehicleList?.results.length / rowsPerPage
                              )}
                              currentPage={page + 1}
                              onPageChange={handleChangePage}
                              rowsPerPage={rowsPerPage}
                              onChangeRowsPerPage={handleChangeRowsPerPage}
                              showRow={false}
                            />
                          </Box>
                        </div>
                      )}

                      {!isVehicleLoading && !vehicleList?.results.length && (
                        <div className="notfoundimg">
                          {" "}
                          <img src={notFound} width={200} alt="" />
                        </div>
                      )}
                    </div>
                  </Box>
                </Box>
              </Item>
            </Grid>
            <Grid  item xs={2} sm={9} md={9} style={{ paddingLeft: 24 }}>
              <Item elevation={0}>
                <Box className="livemap">
                  {/* <GoogleMap list={locationList} /> */}
                  <MapMarker
                    zoomDeviceId={deviceId}
                    list={vehicleList?.results}
                  />

                  {/* <Box className={classes.mapdropdown}>
                    <button className="mapoptions" onClick={handleMapOption}>
                      Map Options
                    </button>
                    {showMapOption && (
                      <div className="mapstyle">
                        <h3>Map Style</h3>
                        <ul className="maplist">
                          <li
                            className={mapOption == 0 ? "selected" : ""}
                            onClick={() => {
                              setMapOption(0);
                            }}
                          >
                            <i>
                              <img
                                src={mapIcon}
                                height={32}
                                width={32}
                                alt=""
                              />
                            </i>
                            <span>Default</span>
                          </li>
                          <li
                            className={mapOption == 1 ? "selected" : ""}
                            onClick={() => {
                              setMapOption(1);
                            }}
                          >
                            <i>
                              <img
                                src={mapIcon}
                                height={32}
                                width={32}
                                alt=""
                              />
                            </i>
                            <span>2X2</span>
                          </li>
                          <li
                            className={mapOption == 2 ? "selected" : ""}
                            onClick={() => {
                              setMapOption(2);
                            }}
                          >
                            <i>
                              <img
                                src={mapIcon}
                                height={32}
                                width={32}
                                alt=""
                              />
                            </i>
                            <span>4X4</span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </Box> */}
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
