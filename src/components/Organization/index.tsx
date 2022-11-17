import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
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
import { useQuery } from "react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AppPaths, SubPaths,Actions } from "../../constants/commonEnums";
import { actionAccess} from "utils/FeatureCheck";
import { auth } from "constants/RouteMiddlePath";


export default function Organization() {
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { data: orgList, isLoading } = useQuery(
    ["orgs", page, rowsPerPage, searchText],
    () => getOrgs(page, rowsPerPage, searchText)
  );

  const isAdd=actionAccess(AppPaths.ORGANIZATIONS,Actions.ADD)
  const isEdit=actionAccess(AppPaths.ORGANIZATIONS,Actions.EDIT)
  const isDelete=actionAccess(AppPaths.ORGANIZATIONS,Actions.DELETE)

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<string>("user");
  const [openDelete, setOpenDelete] = React.useState<boolean>(false);
  
  const navigate = useNavigate();

  const { user } = useAppContext();
  const classes = useStyles();

  async function getOrgs(pageNumber: number, pageSize: number, searchText?: string) {
    let getApiUrl = `${auth}/organizations/?page=${
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
    user: string
  ) => {
    const isAsc = orderBy === user && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    //@ts-ignore
    setOrderBy(user);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function openOrganizationDetails(
    event: React.MouseEvent<HTMLElement>,
    id: string
  ) {
    event.stopPropagation();
    navigate(`/${AppPaths.ORGANIZATIONS}/${id}`);
  }

  const actionMenuItems: MenuType[] = [
    {
      label: "More Info",
      icon: <InfoOutlinedIcon />,
      onClick: openOrganizationDetails,
      access:true,
    },
      { label: "Edit", icon: <InfoOutlinedIcon />, onClick: openOrganizationDetails,access:isEdit },
    {
      label: "Delete",
      icon: <DeleteOutlineOutlinedIcon />,
      onClick: handleOpenDelete,
      access:isDelete
    },
    
  ];

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: true,
      label: "Name",
    },
    {
      id: "email",
      label: "Email",
      numeric: false,
      disablePadding: false,
    },
    { id: "address", label: "Address", numeric: false, disablePadding: false },
    {
      id: "contact_code",
      label: "Contact Code",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "contact",
      label: "Contact No",
      numeric: false,
      disablePadding: false,
    },
    {
      id: "reg",
      label: "Registraion Number",
      numeric: false,
      disablePadding: false,
    },
  ];

  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };
  return (
    <Box style={{ padding: "40px 24px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Organizations</Heading>
        <Box style={{ display: "flex", alignItems: "center" }}>
          <Box style={{ marginRight: 12
             }}>
            <SearchBox
              onChangeFunc={handleSearchInput}
              placeholder="Search Organization by Name or Id"
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
            ) : orgList?.results.length ? (
              orgList?.results.map((orgs: any, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={0} key={index}>
                    <TableCell className={classes.tableBodyCell} align="left">
                      <Box className={classes.columnView}>
                        <Span>{orgs.name}</Span>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">
                        {orgs.email}
                      </Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{orgs.address}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{orgs.contact_code}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{orgs.contact_number}</Span>
                    </TableCell>
                    <TableCell align="left">
                      <Span fontType="secondary">{orgs.registration_number}</Span>
                    </TableCell>
                    
                   
                    <TableCell align="left">
                      <ActionMenu menu={actionMenuItems} id={orgs.id} />
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
          totalPages={Math.ceil(orgList?.count / rowsPerPage)}
          currentPage={page + 1}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}