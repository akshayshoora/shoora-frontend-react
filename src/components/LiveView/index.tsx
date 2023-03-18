import { Fragment, useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Snackbar,
  Alert,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
import VedioLogoImg from "../../assets/video-logo.png";
import Iframe from "react-iframe";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { TableFooter } from "components/commonComponent/Table";
import { getUserName } from "utils/localStorage";
import RenderVideoIframe from "./RenderVideoIframe";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4, 2, 2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
}));

const STATIC_TILES_COUNT = 16;
export default function LiveView() {
  const [selectStatus, setSelectStatus] = useState("all");
  const [visibleVehicleState, setVisibleVehicleState] = useState<any>([]);
  const handleChange = (event: SelectChangeEvent) => {
    setSelectStatus(event.target.value as string);
  };
  const loginUserName: any = getUserName();

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
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<string[]>([]);
  const [selectedDeviceInfoState, setSelectedDevicesInfoState] = useState<any>([]);


  const { data: vehicleList, isLoading: isVehicleLoading } = useQuery(
    ["vehiclelist", searchText, deviceId, selectStatus],
    () => getVehicles(page, rowsPerPage, searchText, selectStatus),
    { refetchOnWindowFocus: false }
  );
  const handleChangePage = (event: unknown, newPage: number) => {
    showTableVehicleListHnldr(newPage - 1, rowsPerPage, vehicleList?.results);
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function getVehicles(
    pageNumber: number,
    pageSize: number,
    searchText?: string,
    selectStatus?: string
  ) {
    // let getApiUrl = `${transport}/vehicles/?page=${
    //   pageNumber + 1
    // }&page_size=${pageSize}&search=${searchText}&vedio=${selectStatus}`;
    let getApiUrl = `${transport}/vehicles/?search=${searchText}&video=${selectStatus}`;

    const response = await client.get(getApiUrl);
    showTableVehicleListHnldr(0, rowsPerPage, response?.data?.results);
    setPage(0);
    return response.data;
  }

  const handleVehicleView = (vehicleInfo: any) => {
    const { id, vin, device, live_feed_urls } = vehicleInfo,
      updateSelectedDeviceInfo = [...selectedDeviceInfoState],
      vehicleKeysIndex = updateSelectedDeviceInfo.findIndex(item => item.id === id);
    if (vehicleKeysIndex >= 0) {
      updateSelectedDeviceInfo.splice(vehicleKeysIndex, 1);
    } else {
      if (Array.isArray(live_feed_urls) && live_feed_urls.length > 0) {
        const visibleTileLength = updateSelectedDeviceInfo.reduce((totalTiles, arr) => {
          const { feedUrls }: any = arr;
          return totalTiles + (Array.isArray(feedUrls) && feedUrls.length || 0);
        }, 0);
        if ((visibleTileLength + live_feed_urls.length) > 16) {
          setSnackbar({
            open: true,
            variant: "error",
            message: `Cannot set more that 16 tiles
             and the current vehicle contain ${live_feed_urls.length} feeds. Unselect the selected vehicle first.`,
          });
          return;
        } else {
          updateSelectedDeviceInfo.push({
            id, vin, device,
            feedUrls: live_feed_urls
          })
        }
      }
    }
    if (Array.isArray(updateSelectedDeviceInfo) && updateSelectedDeviceInfo.length > 0) {
      setSelectedDevice(updateSelectedDeviceInfo.map(item => item.device));
    } else {
      setSelectedDevice([]);
    }
    setSelectedDevicesInfoState(updateSelectedDeviceInfo);
  };

  const getLiveUrl = (arr: string[]) => {
    let url = "?device=";
    for (let i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        url = url.concat(`${arr[i]}`);
      } else {
        url = url.concat(`${arr[i]}&device=`);
      }
    }
    setVideoUrl(url);
  };

  function showTableVehicleListHnldr(
    page: any,
    rowPerPage: any,
    vehicleList: any
  ) {
    if (Array.isArray(vehicleList)) {
      const startIndex = rowPerPage * page,
        lastIndex = (page * rowPerPage) + rowPerPage < vehicleList.length
          ? (page * rowPerPage) + rowPerPage : vehicleList.length;
      setVisibleVehicleState(vehicleList.slice(startIndex, lastIndex));
    }
  }

  // const selectedVehicleIds = useMemo(() => {
  //   if (Array.isArray(selectedDeviceInfoState) && selectedDeviceInfoState.length > 0) {
  //     return selectedDeviceInfoState.map(item => item.device)
  //   } else {
  //     return [];
  //   }
  // }, [selectedDeviceInfoState]);

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
        <Heading>Live View</Heading>
        <Box className={classes.live}>
          <Grid
            container
            spacing={{ xs: 2, md: 3, lg: 3 }}
            columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
            style={{ marginTop: 24 }}
          >
            <Grid item xs={12} sm={4} md={4} lg={3} style={{ paddingLeft: 24 }}>
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
                      <MenuItem value={"all"}>All</MenuItem>
                      <MenuItem value={"online"}>Online</MenuItem>
                      <MenuItem value={"offline"}>Offline</MenuItem>
                    </Select>
                  </FormControl>
                  <Box className="notfound">
                    <div className="contendata">
                      {!isVehicleLoading && (
                        <div>
                          <Table>
                            <TableBody>
                              {Array.isArray(visibleVehicleState) && visibleVehicleState.map(
                                (item: any, index: number) => (
                                  <TableRow key={`device-${item.id}`}>
                                    <div
                                      className={
                                        item["video"] !== "online"
                                          ? "loaddataDisable"
                                          : "loaddata"
                                      }
                                      style={
                                        selectedDevice.includes(item.device)
                                          ? { background: "#fef8f0" }
                                          : {}
                                      }
                                      onClick={() => {
                                        handleVehicleView(item);
                                      }}
                                    >
                                      <i className={`circle ${(item.video === "online" ? "online-vehicle" : "offline-vehicle")}`}></i>
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
                                            stroke={
                                              item.video !== "online"
                                                ? "#D3D3D3"
                                                : "#3BB3C3"
                                            }
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          ></path>
                                        </svg>
                                      </span>
                                    </div>
                                  </TableRow>
                                )
                              )}
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
            <Grid item xs={12} sm={8} md={8} lg={9} style={{ paddingLeft: 16 }}>
              <Item elevation={0}>
                <Box className="liveViewVideo">
                  <Grid container>
                    {/* {selectedDevice.map((item) => (
                      <Fragment key={`selected-${item}`}>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          className="liveframe"
                          style={{ height: "238px", overflow: "hidden" }}
                        >
                          <Iframe
                            url={`https://livefeed.shoora.com/liveview/?device=${item ? item : "-"
                              }&email=its@its.com&password=123456&channel=0`}
                            position="relative"
                            width="100%"
                            id="myId"
                            // className="myClassname"
                            height="300"
                          />
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          className="liveframe"
                          style={{ height: "238px", overflow: "hidden" }}
                        >
                          <Iframe
                            url={`https://livefeed.shoora.com/liveview/?device=${item ? item : "-"
                              }&email=its@its.com&password=123456&channel=1`}
                            position="relative"
                            width="100%"
                            id="myId"
                            // className="myClassname"
                            height="300"
                          />
                        </Grid>
                      </Fragment>
                    ))} */}
                    <RenderVideoIframe
                      selectedDeviceInfo={selectedDeviceInfoState}
                    />
                    {(selectedDevice.length > 0 && loginUserName === "Solar") && <Grid
                      item
                      xs={12}
                      sm={12}
                      md={8}
                      lg={6}
                      className="liveframe"
                      style={{ height: "238px", overflow: "hidden" }}
                    >
                      <Iframe
                        url={`http://120.79.58.1:8088/808gps/open/player/video.html?lang=en&vehiIdno=088832552&account=masheye&password=12345678&channel=1`}
                        position="relative"
                        width="100%"
                        id="myId"
                        // className="myClassname"
                        height="300"
                      />
                    </Grid>}
                    {Array(STATIC_TILES_COUNT - ((selectedDevice.length > 0 && loginUserName === "Solar") ? 1 : 0) - selectedDevice.length * 2)
                      .fill(0)
                      .map((item, index) => (
                        <Grid
                          key={`vedio-${index}`}
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          className="noVedioContainer"
                        >
                          <Box className="vedioLogoScreen">
                            <img src={VedioLogoImg} alt="dummy-vedio-img" />
                          </Box>
                          <Box sx={{ mt: 1.8 }} className="dummy-title"></Box>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

{/* <Box className="dummyBtnContainer">
                            <Box className="dummBtn"></Box>
                            <Box className="dummBtn"></Box>
                          </Box> */}
