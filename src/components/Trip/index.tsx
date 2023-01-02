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
import { useQuery, useMutation } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths, Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess } from "utils/FeatureCheck";
import { auth, monitor } from "constants/RouteMiddlePath";
import { AlertModal } from "components/Alerts/AlertModal";
import { TripModal } from "./TripModal";
import { getDateDisplayFormat, getDuration } from "utils/calenderUtils";
import { latLongToPlace, sanitizeURL } from "utils/helpers";
import { endianness } from "os";
import { useEffect } from "react";

export default function Trip() {
  const [openTrip, setOpenTrip] = React.useState<boolean>(false);
  const [triptId, setTripId] = React.useState<string>("false");
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: tripList, isLoading } = useQuery(
    ["trips", page, rowsPerPage, searchText],
    () => getTrips(page, rowsPerPage, searchText),
    { refetchOnWindowFocus: false }
  );
  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("trip");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [placeDataStatus, setPlaceDataStatus] = React.useState<boolean>(true);
  const classes = useStyles();

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
    let getApiUrl = `${monitor}/trips/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;
    const finalURL = sanitizeURL(getApiUrl)
    const response = await client.get(finalURL);

    return response.data;
  }

  const handleOpenTrip = (id: string) => {
    setTripId(id);
    setOpenTrip(true);
  };

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
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setPlaceDataStatus(true);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      id: "crerated_at",
      label: "Start Date/Time",
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

  const handleCloseTrip = () => setOpenTrip(false);

  async function renderPlaceName() {
    for (let i = 0; i < tripList?.results.length; i++) {
      let startPlace = await latLongToPlace(
        tripList.results[i].start_latitude,
        tripList.results[i].start_longitude,
        true
      );
      let endPlace = await latLongToPlace(
        tripList.results[i].end_latitude,
        tripList.results[i].end_longitude,
        true
      );
      tripList.results[i]["startPlace"] = startPlace;
      tripList.results[i]["endPlace"] = endPlace;
    }

    setPlaceDataStatus(false);
  }

  return (
    <Box style={{ padding: "20px 20px 20px 40px" }}>
      {openDelete && (
        <DeleteModal
          open={openDelete}
          handleClose={handleClose}
          handleDelete={handleDelete}
          label="trip"
        />
      )}
      {openTrip && (
        <TripModal open={openTrip} handleClose={handleCloseTrip} id={triptId} />
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
            {isLoading ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : tripList?.results.length ? (
              tripList?.results.map((trip: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {getDateDisplayFormat(trip.created_at)}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{"-"}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{"-"}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {trip.driver ? trip.driver.name : "-"}
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
                        {getDuration(trip.duration)}
                      </Span>
                    </TableCell>

                    <TableCell align="left">
                      <Button
                        variant="contained"
                        style={{ color: COLORS.WHITE }}
                        onClick={() => {
                          handleOpenTrip(trip.id);
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
          totalPages={Math.ceil(tripList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
