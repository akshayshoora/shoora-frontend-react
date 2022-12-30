import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar, { TableRow } from "@mui/material";
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

export default function () {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4, 2, 2),
    color: theme.palette.text.secondary,
    position: "relative",
    boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
  }));
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
    ["vehiclelist", page, rowsPerPage, searchText, deviceId],
    () => getVehicles(page, rowsPerPage, searchText)
  );

  const { data: gpsList, isLoading: isGpsLoading } = useQuery(
    ["gpslist", page, rowsPerPage, deviceId, searchText],
    () => getGpsList(page, rowsPerPage, deviceId, searchText)
  );

  async function getVehicles(
    pageNumber: number,
    pageSize: number,
    searchText?: string
  ) {
    let getApiUrl = `${transport}/vehicles/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

    const response = await client.get(getApiUrl);

    return response.data;
  }
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function getGpsList(
    pageNumber: number,
    pageSize: number,
    deviceid: string,
    searchText?: string
  ) {
    let getApiUrl = `${monitor}/current-location/?imei=${deviceid}&page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

    const response: any = await client.get(getApiUrl);
    // if(deviceid == ""){
    setLocationList(getLocation(response.data?.results));
    return response.data;
    //   }
    //   else{
    //   for(let i=0;i<response.data?.results.length;i++){

    //   if(response.data?.results[i].imei == deviceid){
    //     setLocationList(getLocation(response.data?.results[i]))

    //     return response.data;
    //   }
    //   }
    // }
  }

  const getLocation = (list: string[]) => {
    const markersData = list.map((item: any, index) => ({
      id: index,
      lat: 1 * item.latitude,
      lng: 1 * item.longitude,
      vehicleInfo: item,
    }));
    return markersData;
  };

  return (
    <Box style={{ padding: "20px 0 0 25px" }}>
      <Box>
        <Heading>Map View</Heading>
        <Box className={classes.live}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 6, sm: 8, md: 12 }}
            style={{ marginTop: 24 }}
          >
            <Grid xs={2} sm={3} md={3} style={{ paddingLeft: 24 }}>
              <Item elevation={1}>
                <Box className="contentMain">
                  <Box className="searchbar" style={{ padding: "20px 15px" }}>
                    <input
                      className="searchField"
                      placeholder="Search Asset ID"
                      type="search"
                    />
                    <Button className="searchBtn">
                      <img src={SerachIcon} height={24} width={24} alt="" />
                    </Button>
                  </Box>
                  <List component="nav" aria-label="search user">
                    <ListItemText primary="All" />
                    <ListItemText primary="Active assets" />
                    <ListItemText primary="Unreachable Assets" />
                    <ListItemText primary="Inactive assets" />
                  </List>
                  <Box className="notfound">
                    <div className="contendata">
                      {!isVehicleLoading && (
                        <div>
                          <Table>
                            {vehicleList?.results.map((item: any) => (
                              <TableRow>
                                <div
                                  className="loaddata"
                                  style={
                                    deviceId == item.device
                                      ? { background: "#fef8f0" }
                                      : {}
                                  }
                                  onClick={() => {
                                    setDeviceId(item.device);
                                  }}
                                >
                                  <i className="circle"></i>
                                  <span className="trackid">{item.vin}</span>
                                  <span className="arrowright">
                                    <svg
                                      width="17"
                                      height="15"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M15.75 7.726h-15M9.7 1.701l6.05 6.024L9.7 13.75"
                                        stroke="#3BB3C3"
                                        stroke-width="1.5"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                      ></path>
                                    </svg>
                                  </span>
                                </div>
                              </TableRow>
                            ))}
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
                                vehicleList?.count / rowsPerPage
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
            <Grid xs={2} sm={9} md={9} style={{ paddingLeft: 24 }}>
              <Item elevation={0}>
                <Box className="livemap">
                  <GoogleMap list={locationList} />

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
