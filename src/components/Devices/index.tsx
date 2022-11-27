import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableRow from "@mui/material/TableRow";
import { SelectChangeEvent, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Span from "components/commonComponent/Span";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import SearchBox from "components/commonComponent/SearchField";
import COLORS from "../../constants/colors";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { stringCheckForTableCell } from "utils/StringCheck";
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
import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths,Actions } from "../../constants/commonEnums";
import { DeleteModal } from "components/commonComponent/DeleteModal";
import { actionAccess} from "utils/FeatureCheck";
import { transport } from "constants/RouteMiddlePath";

export default function Devices() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: deviceList, isLoading } = useQuery(
    ["devices", page, rowsPerPage, searchText],
    () => getDevices(page, rowsPerPage, searchText)
  );

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("devices");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  const { user } = useAppContext();

  const isAdd=actionAccess(AppPaths.DEVICES,Actions.ADD)
  const isEdit=actionAccess(AppPaths.DEVICES,Actions.EDIT)
  const isDelete=actionAccess(AppPaths.DEVICES,Actions.DELETE)
  
  
  const navigate = useNavigate();

  
  const classes = useStyles();
  async function getDevices(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${transport}/devices/?page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

   
    const response = await client.get(getApiUrl);

    return response.data;
  }

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpenDelete(false);
  };


  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    devices: string
  ) => {
    const isAsc = orderBy === devices && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    //@ts-ignore
    setOrderBy(devices);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function openDeviceDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.DEVICES}/${id}`);
  }

  function editDeviceDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.DEVICES}/${SubPaths.EDIT}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openDeviceDetails,
      access:true
    }
    // { label: "Edit", icon: <EditOutlinedIcon />, onClick: editDeviceDetails,access:isEdit },
    // {
    //   label: "Delete",
    //   icon: <DeleteOutlineOutlinedIcon />,
    //   onClick: handleOpenDelete,
    //   access:isDelete
    // },
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "device_type",
      numeric: false,
      disablePadding: true,
      label: "Device Type",
    },
    {
      id: "organization",
      label: "Organization",
      numeric: false,
      disablePadding: false,
    },
    { 
    id: "is_assigned_to_vehicle", 
    label: "Assigned to Vehicle", 
    numeric: false,
     disablePadding: false 
    },
    {
      id: "activation_date",
      label: "Activation Date",
      numeric: false,
      disablePadding: false,
    },
  ];

  function addDevice() {
    navigate(`/${AppPaths.DEVICES}/${SubPaths.ADD}`);
  }
  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };
  return (
    <Box style={{ padding: "20px 20px 20px 40px" }}>
      {openDelete && <DeleteModal open={openDelete} handleClose={handleClose} label="device"/>}
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Devices</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: 12 
             }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Device by Name or Id"
            />
          </Box>
          {/* {isAdd ? (
            <Button
              variant="contained"
              style={{ background: COLORS.PRIMARY_COLOR, color:COLORS.WHITE }}
              onClick={addDevice}
            >
              <AddIcon />
              add device
            </Button>
          ) : null}  */}
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
            ) : deviceList?.results.length ? (
                deviceList?.results.map((device: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{device.device_type}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {device.organization}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{device.is_assigned_to_vehicle.toString()}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{device.activation_date}</Span>
                    </TableCell>
                   
                   
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={device.id} />
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
          totalPages={Math.ceil(deviceList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}
