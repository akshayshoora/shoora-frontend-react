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
import { auth, transport } from "constants/RouteMiddlePath";

export default function WorstDrivers() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [deleteId, setDeleteId] = React.useState<string>("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: vehicleList, isLoading } = useQuery(
    ["worstDriver", page, rowsPerPage, searchText],
    () => getWorstDrivers(page, rowsPerPage, searchText)
  );
  const { user } = useAppContext();

  const isAdd = actionAccess(AppPaths.VEHICLES, Actions.ADD);
  const isEdit = actionAccess(AppPaths.VEHICLES, Actions.EDIT);
  const isDelete = actionAccess(AppPaths.VEHICLES, Actions.DELETE);

  const navigate = useNavigate();

  const classes = useStyles();
  async function getWorstDrivers(
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
  
  const headCells: readonly HeadCell[] = [
    {
      id: "vehicle_type",
      numeric: false,
      disablePadding: true,
      label: "Data 1",
    },
    {
      id: "make",
      label: "Data 2",
      numeric: false,
      disablePadding: false,
    },
    { id: "model", label: "Data 3", numeric: false, disablePadding: false },
    {
      id: "vin",
      label: "Data 4",
      numeric: false,
      disablePadding: false,
    },
  ];


  return (
    <Box style={{ padding: "20px 20px 20px 40px" }}>

      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Top 10 Worst Drivers</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: isAdd ? 12 : 0 }}>
          </Box>
        </Box>
      </Box>
      <Box className={classes.root}>
        <Table className={classes.table}>
          <TableHeader
            headings={headCells}
            shouldShowActionMenu={false}
          />
          <TableBody>
            {isLoading ? (
              <TableCell colSpan={8}>
                <LoadingScreen />
              </TableCell>
            ) : vehicleList?.results.length ? (
              vehicleList?.results.map((vehicle: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{vehicle.vehicle_type}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{vehicle.make}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{vehicle.model}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{vehicle.vin}</Span>
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
  );
}
