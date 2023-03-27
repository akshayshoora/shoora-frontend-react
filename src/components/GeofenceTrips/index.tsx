import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button } from "@mui/material";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { useAppContext } from "ContextAPIs/appContext";
import COLORS from "../../constants/colors";
import {
  Modal, Snackbar, Alert
} from "@mui/material";
import {
  HeadCell,
  Order,
  TableFooter,
  TableHeader, TableHeaderGeofence, TableHeaderUpdated
} from "components/commonComponent/Table";
import ActionMenu, {
  MenuType,
} from "components/commonComponent/Table/ActionMenu";
import { useQuery, useMutation } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths, Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess } from "utils/FeatureCheck";
import { auth, monitor, transport } from "constants/RouteMiddlePath";
import { AlertModal } from "components/Alerts/AlertModal";
import { TripModal } from "./TripModal";
import { GeofenceTripModal } from "./GeofenceTripModal";
import {
  getDateDisplayFormat,
  getDuration,
  getDateTime,
} from "utils/calenderUtils";
import { latLongToPlace, sanitizeURL } from "utils/helpers";
import { useEffect } from "react";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CancelIcon from '@mui/icons-material/Cancel';

//Trip Page
export default function Trip() {
  const [openTrip, setOpenTrip] = React.useState<boolean>(false);
  const [triptId, setTripId] = React.useState<string>("false");
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [appliedDistanceFilter, setAppliedDistanceFilter] = React.useState<any>(false);
  const [isFilterAppliedState, setIsFilterAppliedState] = React.useState(false);
  const [betweenTripModal, setBetweenTripModal] = React.useState<any>(false);
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("trip");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const [row, setRow] = React.useState();
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [placeDataStatus, setPlaceDataStatus] = React.useState<boolean>(true);
  const appliedFilterInfoRef = React.useRef<any>(undefined);
  const classes = useStyles();

  useEffect(() => {
    mutateGeofenceTripInfo({ ...appliedFilterInfoRef.current, pageNo: page + 1, pageSize: rowsPerPage });
  }, []);


  const handleOpenTrip = (id: string, trip: any) => {
    // setTripId(id);
    setRow(trip);
    setOpenTrip(true);
  };

  const handleBetweenTripModal = () => {
    setBetweenTripModal(true);
  };
  const handleCloseBetweenTripModal = (appliedFilter: any, reason?: any) => {
    if (reason === "backdropClick") {
      return;
    }
    if (appliedFilter) {
      setAppliedDistanceFilter(true);
    }
    setBetweenTripModal(false)
  };

  function handleClearGeofenceFilter() {
    setAppliedDistanceFilter(false);
  }

  const handleOpenDelete = (
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) => {
    setDeleteId(id);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
    // getTrips(page, rowsPerPage, searchText);
  };

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    vehicle: string
  ) => {
    const isAsc = orderBy === vehicle && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    //@ts-ignore
    setOrderBy(vehicle);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    // setPlaceDataStatus(true);
    setPage(newPage - 1);
    // if (appliedFilterInfoRef.current)
    mutateGeofenceTripInfo({ ...appliedFilterInfoRef.current, vehicle_number: searchText, pageNo: newPage, pageSize: rowsPerPage });
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    // setPlaceDataStatus(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    // if (appliedFilterInfoRef.current)
    mutateGeofenceTripInfo({ ...appliedFilterInfoRef.current, vehicle_number: searchText, pageNo: 1, pageSize: event.target.value });
  };

  function openTripDetails(event: React.MouseEvent<HTMLElement>, id: string) {
    event.stopPropagation();
    navigate(`/${AppPaths.TRIP}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openTripDetails,
      access: true,
    },
  ];

  const headCells: any = [
    {
      id: "Vehicle Number",
      label: "vin",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    },
    {
      id: "start_point",
      label: "Start Point",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    },
    {
      id: "end_point",
      label: "End Point",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    },
    {
      id: "loading_out_time",
      label: "Loading",
      numeric: false,
      disablePadding: false,
      alignment: "center",
      colSpan: 2
    },
    {
      id: "unloading_out_time",
      label: "Unloading",
      numeric: false,
      disablePadding: false,
      alignment: "center",
      colSpan: 2
    },
    // {
    //   id: "driver",
    //   label: "Driver",
    //   numeric: false,
    //   disablePadding: false,
    // },
    {
      id: "incidents",
      label: "Incidents",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    },
    {
      id: "distance",
      label: "Distance",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    },
    {
      id: "duration",
      label: "Duration",
      numeric: false,
      disablePadding: false,
      rowSpan: 2
    },
  ];

  const handleSearchInput = (e: any) => {
    mutateGeofenceTripInfo({ ...appliedFilterInfoRef.current, vehicle_number: e, pageNo: 1, pageSize: rowsPerPage });
    setSearchText(e);
  };


  const handleCloseTrip = () => setOpenTrip(false);

  // async function renderPlaceName() {
  //   for (let i = 0; i < tripList?.results.length; i++) {
  //     let startPlace = await latLongToPlace(
  //       tripList.results[i].start_latitude,
  //       tripList.results[i].start_longitude,
  //       true
  //     );
  //     let endPlace = await latLongToPlace(
  //       tripList.results[i].end_latitude,
  //       tripList.results[i].end_longitude,
  //       true
  //     );
  //     tripList.results[i]["startPlace"] = startPlace;
  //     tripList.results[i]["endPlace"] = endPlace;
  //   }

  //   setPlaceDataStatus(false);
  // }


  //API Call for applying filter.

  const GeofenceTripBeetweenMutation = useMutation(generateVehicleReportApiCall, {
    onSuccess: (responseData) => {
      // const { data } = responseData || {};
      setBetweenTripModal(false);
      setAppliedDistanceFilter(true);
    },
    onError: () => {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    }
  });
  async function generateVehicleReportApiCall(tripInfo: any) {
    const { startDate, endDate, startAddress, endAddress, vehicle_number, pageNo = 1, pageSize = 10 } = tripInfo || {};

    //   isoSinceDate = endDate ? new Date(startDate).toISOString() : undefined,
    //   endDateUpdated = new Date(endDate);
    // endDateUpdated.setDate(endDateUpdated.getDate() + 1);
    // const isoUntilDate = endDate ? endDateUpdated.toISOString() : undefined,
    const params: any = {
      since: startDate, until: endDate, start: startAddress, end: endAddress,
      vehicle_number,
      page: pageNo, page_size: pageSize,
    }
    const response = await client.get(`${monitor}/geofence-trips/`, { params });
    return response.data;
  }
  const { mutate: mutateGeofenceTripInfo, isLoading: geofenceTripLoading, data: geoFenceList } = GeofenceTripBeetweenMutation;

  function applyFilterCallback(filterDetails: any) {
    appliedFilterInfoRef.current = filterDetails;
    mutateGeofenceTripInfo({ ...filterDetails, vehicle_number: searchText, pageNo: 1, pageSize: rowsPerPage });
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
      <Box style={{ padding: "20px 20px 20px 40px" }}>
        {/* {betweenTripModal && (
        <GeofenceTripModal
          open={betweenTripModal}
          handleClose={handleCloseBetweenTripModal}
          id={triptId}
        />
      )} */}
        {openTrip && (
          <TripModal
            open={openTrip}
            handleClose={handleCloseTrip}
            geofenceDetails={row}
          />
        )}
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Heading>Geofence Trips</Heading>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box style={{ marginRight: 12 }}>
              <SearchBox
                onChangeFunc={handleSearchInput}
                placeholder="Search By Vehicle Number"
              />
            </Box>
            {/* <Badge color="success" variant="dot" invisible={!appliedDistanceFilter}>
              <Button
                variant="contained"
                style={{ color: COLORS.WHITE }}
                onClick={handleBetweenTripModal}
                aria-describedby="applied-trip-details"
              >
                <FilterAltIcon sx={{ marginRight: 0.5 }} />
                Trip Between Geofence
              </Button>
            </Badge> */}
            <Tooltip title="Apply Filter">
              <IconButton onClick={handleBetweenTripModal}>
                <Badge color="success" variant="dot" invisible={!appliedFilterInfoRef.current}>
                  <FilterListIcon />
                </Badge>
              </IconButton>
            </Tooltip>


            {/* {appliedDistanceFilter && <Button
              variant="contained"
              // style={{ color: COLORS.WHITE }}
              onClick={handleClearGeofenceFilter}
              style={{ backgroundColor: "#d32f2f", color: COLORS.WHITE }}
            >
              <CancelIcon sx={{ marginRight: 0.5 }} />
              Clear Geofence Filter
            </Button>} */}
            {/* <Badge color="success" variant="dot" invisible={isFilterAppliedState}>
            <Button
              variant="contained"
              style={{ color: COLORS.WHITE }}
              onClick={handleBetweenTripModal}
            >
              <FilterAltIcon sx={{ marginRight: 0.5 }} />
              Trip Between Geofence
            </Button>
          </Badge> */}

          </Box>
        </Box>
        <Box className={classes.root}>
          <Table className={classes.table}>
            <TableHeaderGeofence
              headings={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              shouldShowActionMenu={true}
            />
            <TableBody>
              {geofenceTripLoading ? (
                <TableRow>
                  <TableCell colSpan={8}>
                    <LoadingScreen />
                  </TableCell>
                </TableRow>
              ) : (Array.isArray(geoFenceList?.results) && (geoFenceList?.results.length)) ? (
                geoFenceList?.results.map((trip: any, index: number) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={0} key={index}>
                      <TableCell align="left">
                        <Span fontType="secondary">{trip?.vin}</Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">{trip?.start_geofence}</Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">{trip?.end_geofence}</Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">
                          {getDateTime(trip?.loading_in_datetime)}
                        </Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">
                          {getDateTime(trip?.loading_out_datetime)}
                        </Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">
                          {getDateTime(trip?.unloading_in_datetime)}
                        </Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">
                          {getDateTime(trip?.unloading_out_datetime)}
                        </Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">{trip.total_incidents}</Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">{trip.distance} km</Span>
                      </TableCell>
                      <TableCell align="left">
                        <Span fontType="secondary">
                          {trip?.duration} hrs
                        </Span>
                      </TableCell>

                      <TableCell align="left">
                        <Button
                          variant="contained"
                          style={{ color: COLORS.WHITE }}
                          onClick={() => {
                            handleOpenTrip(trip.id, trip);
                          }}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={11}>
                    <div className={classes.noDataView}>
                      Try adjusting your filters between the geofence trips.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TableFooter
            totalPages={Number(geoFenceList?.count) ? Math.ceil(geoFenceList?.count / rowsPerPage) : 1}
            currentPage={page + 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
      <Modal
        open={betweenTripModal}
        onClose={handleCloseBetweenTripModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <GeofenceTripModal
          open={betweenTripModal}
          closeModalHndlr={handleCloseBetweenTripModal}
          isLoadingGeofenceData={geofenceTripLoading}
          applyFilterCallback={applyFilterCallback}
          appliedFilterInfo={appliedFilterInfoRef.current}
        />
      </Modal>
    </>
  );
}
