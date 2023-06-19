import {
  Alert,
  Snackbar,
} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VerifiedIcon from '@mui/icons-material/Verified';
import Tooltip from '@mui/material/Tooltip';
import TableRow from "@mui/material/TableRow";
import useStyles from "components/Trip/style";
import { SelectChangeEvent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { AppPaths, SubPaths, Actions } from "constants/commonEnums";
import Download from "@mui/icons-material/Download";
import Span from "components/commonComponent/Span";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import client from "serverCommunication/client";
import { Grid, TextField } from '@material-ui/core';
import LoadingScreen from "components/commonComponent/LoadingScreen";
import FilterListIcon from '@mui/icons-material/FilterList';
import { stringCheckForTableCell } from "utils/StringCheck";
import { useAppContext } from "ContextAPIs/appContext";
import IconButton from '@mui/material/IconButton';
import COLORS from "../../constants/colors";
import TripFilterModal from "components/Tyre/TyreFilters";

import Badge from '@mui/material/Badge';
import {
  HeadCell,
  Order,
  TableFooter,
  TableHeader,
} from "components/commonComponent/Table";
import ActionMenu, {
  MenuType,
} from "components/commonComponent/Table/ActionMenu";
import { useMutation, useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess } from "utils/FeatureCheck";
import { auth, transport ,monitor } from "constants/RouteMiddlePath";
import { typreData } from "components/Tyre/helper";

export default function Inventory (){
  const [searchText, setSearchText] = React.useState("");
  const [snackbar, setSnackbar] = React.useState<{
      open: boolean;
      variant: "success" | "error" | "info";
      message: string;
    }>({ open: false, variant: "info", message: "" });
  const [order, setOrder] = React.useState<Order>("asc");
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = React.useState<string>("tyre");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const isAdd = actionAccess(AppPaths.DRIVERS, Actions.ADD);
  const tripFilterRef = React.useRef<any>(undefined);
  const [tripFilterModalState, setTripFilterModalState] = React.useState(false);
 
  
  const { data: driverList, isLoading } = useQuery(
      ["drivers", page, rowsPerPage, searchText],
      () => getDevices(page, rowsPerPage, searchText)
    );
  const classes = useStyles();
  function openDriverDetails(event: React.MouseEvent<HTMLElement>, id: string) {
  event.stopPropagation();
  navigate(`/${AppPaths.TYRE}/${id}`);
}
function closeFilterModalHndlr(event: any, reason: any) {
  if (reason === "backdropClick") {
    return;
  }
  setTripFilterModalState(false);
}


const handleSearchInput = (e: any) => {
  setSearchText(e);
};
function applyFilterHndlr() {
  setTripFilterModalState(!tripFilterModalState);
}
  async function getDevices(
      pageNumber: number,
      pageSize: number,
      searchText?: string
    ) {
      let getApiUrl = `${transport}/drivers/?page=${pageNumber + 1
        }&page_size=${pageSize}&search=${searchText}`;
  
      const response = await client.get(getApiUrl);
  
      return response.data;
    }
  const handleRequestSort = (
      _event: React.MouseEvent<unknown>,
      drivers: string
    ) => {
      const isAsc = orderBy === drivers && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      //@ts-ignore
      setOrderBy(drivers);
    };
    const actionMenuItems: MenuType[] = [
  {
    label: "More Info",
    icon: <InfoOutlinedIcon />,
    onClick: openDriverDetails,
    access: true,
  },
  // {
  //   label: "Edit",
  //   icon: <EditOutlinedIcon />,
  //   onClick: () => { },
  //   access: isEdit,
  // },
  // {
  //   label: "Delete",
  //   icon: <DeleteOutlineOutlinedIcon />,
  //   onClick: () => { },
  //   access: isDelete,
  // },
];
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
//Trip Summary api call
const tripSummaryMutationCallbck = useMutation(tripSummaryApiCall, {
  onError: () => {
    setSnackbar({
      open: true,
      variant: "error",
      message: "Something went wrong.",
    })
  }
});

async function tripSummaryApiCall(tripInfo: any) {
  const { since, until, vehicle_id } = tripInfo || {};
  const isSinceDate = since ? new Date(since).toISOString() : "",
    isoUntilDate = until ? new Date(until).toISOString() : "";
  const params: any = {
    vehicle_id, since: isSinceDate, until: isoUntilDate
  }
  const response = await client.get(`${monitor}/trip-summary/`, { params });
  return response.data;
}
const { mutate: mutateTripSummaryInfo, isLoading: isTripSummaryLoading, data: tripSummaryResp } = tripSummaryMutationCallbck;

function applyTripFilterHndlr(filterDetails: any) {
  tripFilterRef.current = filterDetails;
  mutateTripInfo({ ...filterDetails, pageNo: 1, pageSize: rowsPerPage });
  if (filterDetails?.vehicle_id) {
    mutateTripSummaryInfo(filterDetails);
  }
}
function addDriver() {
  navigate(`/${AppPaths.TYRE}/${SubPaths.ADD}`);
}
function Configuration() {
  navigate(`/${AppPaths.TYRE}/${SubPaths.CONFIGURATION}`);
}
  const headCells: readonly HeadCell[] = [
      {
        id: "Tyre info",
        label: "Tyre info",
        numeric: false,
        disablePadding: false,
      },
      {
        id: "Purchase Date",
        label: "Purchase Date",
        numeric: false,
        disablePadding: false,
      },
      {
        id: "Tyre Type",
        label: "Tyre Type",
        numeric: false,
        disablePadding: false,
      },
  
      {
        id: "Tyre Model",
        label: "Tyre Model",
        numeric: false,
        disablePadding: false,
      },
      {
        id: "KM Run",
        label: "KM Run",
        numeric: false,
        disablePadding: false,
      },
      {
        id: "KM Limit",
        label: "KM Limit",
        numeric: false,
        disablePadding: false,
      },
      {
          id: "Running",
          label: "Running",
          numeric: false,
          disablePadding: false,
      },
      {
          id: "Thread Depth",
          label: "Thread Depth",
          numeric: false,
          disablePadding: false,
      },
      {
          id: "cost",
          label: "cost",
          numeric: false,
          disablePadding: false,
      },
      {
        id: "Ply Rating",
        label: "Ply Rating",
        numeric: false,
        disablePadding: false,
      },
      {
        id: "Tyre Size",
        label: "Tyre Size",
        numeric: false,
        disablePadding: false,
      },
      {
        id: "Psi",
        label: "Psi",
        numeric: false,
        disablePadding: false,
      },
    ];

    return (
      <Box style={{ padding: "20px 20px 20px 40px" }}>
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
          <Heading>Inventroy</Heading>
            <Box style={{ display: "flex", alignItems: "center" }}>
            <Box style={{ marginRight: isAdd ? 12 : 0 }}>
                <SearchBox
                  onChangeFunc={handleSearchInput}
                  placeholder="Search Tyre info"
                />
              </Box>
              <Button
            variant="contained"
            style={{ background: COLORS.PRIMARY_COLOR, color: COLORS.WHITE, marginLeft: "10px" }}
            onClick={addDriver}
          >
            <AddIcon />
            Tyre Inward
          </Button>
          <Button
            variant="contained"
            style={{ background: COLORS.PRIMARY_COLOR, color: COLORS.WHITE, marginLeft: "10px" }}
            onClick={Configuration}
          >
            <AddIcon />
            Tyre Configuration
          </Button>
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
                      shouldShowActionMenu={false}
                  />
                  <TableBody>
          {isLoading ? (
            <TableCell colSpan={8}>
              <LoadingScreen />
            </TableCell>
          ) : typreData.length ? (
            typreData.map((tyre: any, index: number) => {
              return (
                <TableRow hover role="checkbox" tabIndex={0} key={index}>
                  <TableCell className={classes.tableBodyCell} align="center">
                    <Box className={classes.columnView}>
                      <Span>{tyre.ucNo}</Span>
                      <span>{tyre.brand}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">{tyre.refType}</Span>
                  </TableCell>
                  {/* <TableCell align="center">
                    <Span fontType="secondary">{tyre.passport_number}</Span>
                  </TableCell> */}

                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.brand}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary"> {tyre?.size}</Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.pr}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.pattern}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.setType}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.tyreSerialNo}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.status}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.status}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.status}
                    </Span>
                  </TableCell>
                  <TableCell align="center">
                    <Span fontType="secondary">
                      {tyre?.status}
                    </Span>
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
          </Box>
      </Box>
      
    )
  
          
  }