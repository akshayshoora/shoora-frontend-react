import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button } from "@mui/material";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import { useAppContext } from "ContextAPIs/appContext";
import COLORS from "../../constants/colors";
import {
  HeadCell,
  Order,
  TableFooter,
  TableHeader,
} from "components/commonComponent/Table";
import ActionMenu, {
  MenuType,
} from "components/commonComponent/Table/ActionMenu";
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import { useQuery, useMutation } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths, Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess } from "utils/FeatureCheck";
import { auth, monitor } from "constants/RouteMiddlePath";
import { AlertModal } from "components/Alerts/AlertModal";
import { TripModal } from "./TripModal";
import { GeofenceTripModal } from "./GeofenceTripModal";
import TripFilterModal from "./TripFilterModal";
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
  const tripFilterRef = React.useRef<any>(undefined);
  // const { data: tripList, isLoading } = useQuery(
  //   ["trips", page, rowsPerPage, searchText],
  //   () => getTrips(page, rowsPerPage, searchText),
  //   { refetchOnWindowFocus: false }
  // );
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
  const [tripFilterModalState, setTripFilterModalState] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    mutateTripInfo({ ...tripFilterRef.current, pageNo: page + 1, pageSize: rowsPerPage });
  }, []);

  // useEffect(() => {
  //     if(tripList){
  //       renderPlaceName();
  //     }
  //    },[tripList]);

  async function getTrips(
    pageNumber: number,
    pageSize: number,
    searchText?: string
  ) {
    let getApiUrl = `${monitor}/trips/?page=${pageNumber + 1
      }&page_size=${pageSize}&search=${searchText}`;
    const finalURL = sanitizeURL(getApiUrl);
    const response = await client.get(finalURL);

    return response.data;
  }

  const handleOpenTrip = (id: string, trip: any) => {
    setTripId(id);
    setRow(trip);
    setOpenTrip(true);
  };

  const handleBetweenTripModal = () => {
    setBetweenTripModal(true);
  };
  const handleCloseBetweenTripModal = (appliedFilter: any) => {
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
    getTrips(page, rowsPerPage, searchText);
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
    setPlaceDataStatus(true);
    setPage(newPage - 1);
    mutateTripInfo({ ...tripFilterRef.current, pageNo: newPage, pageSize: rowsPerPage });
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setPlaceDataStatus(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    mutateTripInfo({ ...tripFilterRef.current, pageNo: 1, pageSize: event.target.value });
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

  const headCells: readonly HeadCell[] = [
    {
      id: "Vehicle Number",
      label: "vin",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "start_ltime",
      label: "Start Time",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "end_time",
      label: "End Time",
      numeric: false,
      disablePadding: false,
    },

    {
      id: "driver",
      label: "Driver",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "incidents",
      label: "Incidents",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "distance",
      label: "Distance",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "duration",
      label: "Duration",
      numeric: false,
      disablePadding: false,
    },
  ];

  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };

  const deleteTripMutation = useMutation(deleteTrip, {
    onSuccess: () => {
      handleClose();
      setSnackbar({
        open: true,
        variant: "success",
        message: "Trip deleted.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.TRIP}`);
      }, 1000);
    },

    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });

  const { mutate: mutateDeleteTrip } = deleteTripMutation;

  function deleteTrip() {
    return client.delete(`${auth}/users/${deleteId}`);
  }

  function handleDelete() {
    mutateDeleteTrip();
  }

  function applyFilterHndlr() {
    setTripFilterModalState(!tripFilterModalState);
  }

  function closeFilterModalHndlr(event: any, reason: any) {
    if (reason === "backdropClick") {
      return;
    }
    setTripFilterModalState(false);
  }
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

  //Get Trip API call

  const tripsMutationCallback = useMutation(generateTripsApiCall, {
    onSuccess: (responseData) => {
      // const { data } = responseData || {};
      setTripFilterModalState(false);
      // setAppliedDistanceFilter(true);
    },
    onError: () => {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      })
    }
  });

  async function generateTripsApiCall(tripInfo: any) {
    const { since, until, vehicle_details, driver_details, pageNo = 1, pageSize = 10, ...otherFilter } = tripInfo || {};
    const isSinceDate = since ? new Date(since).toISOString() : "",
      isoUntilDate = until ? new Date(until).toISOString() : "";
    // isoSinceDate = until ? new Date(since).toISOString() : undefined,
    //   endDateUpdated = new Date(until);
    // endDateUpdated.setDate(endDateUpdated.getDate() + 1);
    // const isoUntilDate = until ? endDateUpdated.toISOString() : undefined,
    const params: any = {
      ...otherFilter, since: isSinceDate, until: isoUntilDate,
      page: pageNo, page_size: pageSize,
    }
    const response = await client.get(`${monitor}/trips/`, { params });
    return response.data;
  }
  const { mutate: mutateTripInfo, isLoading: isTripInfoLoading, data: tripsInfoResp } = tripsMutationCallback;

  function applyTripFilterHndlr(filterDetails: any) {
    tripFilterRef.current = filterDetails;
    mutateTripInfo({ ...filterDetails, pageNo: 1, pageSize: rowsPerPage });
  }

  return (
    <Box style={{ padding: "80px 20px 20px 40px" }}>
      {openDelete && (
        <DeleteModal
          open={openDelete}
          handleClose={handleClose}
          handleDelete={handleDelete}
          label="trip"
        />
      )}
      {betweenTripModal && (
        <GeofenceTripModal
          open={betweenTripModal}
          handleClose={handleCloseBetweenTripModal}
          id={triptId}
        />
      )}
      {openTrip && (
        <TripModal
          open={openTrip}
          handleClose={handleCloseTrip}
          id={triptId}
        />
      )}
      {tripFilterModalState && (
        <TripFilterModal
          isOpenFilterModal={tripFilterModalState}
          closeFilterModalHndlr={closeFilterModalHndlr}
          applyingFilterProgress={isTripInfoLoading}
          appliedFilterDetails={tripFilterRef.current}
          applyFilterCallback={applyTripFilterHndlr}
        />
      )}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Trips</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: 12 }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Trips"
            />
          </Box>
          {/* {!appliedDistanceFilter && <Button
            variant="contained"
            style={{ color: COLORS.WHITE }}
            onClick={handleBetweenTripModal}
          >
            <MyLocationIcon sx={{ marginRight: 0.5 }} />
            Trip Between Geofence
          </Button>} */}
          {/* {appliedDistanceFilter && <Button
            variant="contained"
            // style={{ color: COLORS.WHITE }}
            onClick={handleClearGeofenceFilter}
            style={{ backgroundColor: "#d32f2f", color: COLORS.WHITE }}
          >
            <CancelIcon sx={{ marginRight: 0.5 }} />
            Clear Geofence Filter
          </Button>} */}

          <Tooltip title="Apply Filter">
            <IconButton onClick={applyFilterHndlr}>
              <Badge color="success" variant="dot" invisible={!tripFilterRef.current}>
                <FilterListIcon />
              </Badge>
            </IconButton>
          </Tooltip>



        </Box>
      </Box>
      <Box className={classes.root}>
        <Table className={classes.table}>
          <TableHeader
            headings={headCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            shouldShowActionMenu={true}
          />
          <TableBody>
            {isTripInfoLoading ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : tripsInfoResp?.results.length ? (
              tripsInfoResp?.results.map((trip: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell align="left">
                      <Span fontType="secondary">{trip.vehicle_vin}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {getDateTime(trip.trip_started_at)}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {getDateTime(trip.trip_ended_at)}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{trip?.driver?.name || "-"}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{trip.total_incidents}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{trip.distance} km</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {getDuration(trip.duration / 60)}
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
              <TableCell colSpan={8}>
                <div className={classes.noDataView}>
                  <Span fontType="secondary">No Data Found</Span>
                </div>
              </TableCell>
            )}
          </TableBody>
        </Table>
        <TableFooter
          totalPages={Number(tripsInfoResp?.count) ? Math.ceil(tripsInfoResp?.count / rowsPerPage) : 1}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box >
  );
}
