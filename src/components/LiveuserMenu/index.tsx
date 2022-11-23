import { useState } from "react";
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

export default function LiveuserMenu() {
  const classes = useStyles();

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
          <div className="loaddata"> 
             <i className="circle"></i><span className="trackid">T530DHD</span><span className="arrowright"><svg width="17" height="15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.75 7.726h-15M9.7 1.701l6.05 6.024L9.7 13.75" stroke="#3BB3C3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
          </div>
           <div className="notfoundimg"> <img src={notFound} width={200} alt="" /></div>

          </div>
        </Box>
    </Box>
  );
}
