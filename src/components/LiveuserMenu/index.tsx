import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SerachIcon from "../../assets/search-icon.png";
import notFound from "../../assets/404.jpg";
import { Form } from "react-router-dom";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import { monitor, transport } from "constants/RouteMiddlePath";
import { useQuery, useMutation } from "react-query";
import client from "serverCommunication/client";

export default function LiveuserMenu() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  const [deviceId, setDeviceId] = useState("");
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

  async function getGpsList(
    pageNumber: number,
    pageSize: number,
    deviceid: string,
    searchText?: string
  ) {
    let getApiUrl = `${monitor}/current-location/?id=${deviceid}&page=${
      pageNumber + 1
    }&page_size=${pageSize}&search=${searchText}`;

    const response = await client.get(getApiUrl);

    return response.data;
  }

  const handleSearchInput = (e: any) => {
    setSearchText(e);
  };

  return (
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
          {!isVehicleLoading &&
            vehicleList?.results.map((item: any) => (
              <div className="loaddata">
                <i className="circle"></i>
                <span className="trackid">{item.id.slice(0, 8)}</span>
                <span
                  className="arrowright"
                  onClick={() => {
                    setDeviceId(item.id);
                  }}
                >
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
            ))}
          <div className="notfoundimg">
            {" "}
            <img src={notFound} width={200} alt="" />
          </div>
        </div>
      </Box>
    </Box>
  );
}
