import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Chip from '@mui/material/Chip';

import Summary from "../Summary";
import { useAppContext } from "ContextAPIs/appContext";

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useAppContext();



  return (
    <Box style={{ padding: "20px 40px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Dashboard</Heading>
      </Box>
      <Box className={classes.root}>
        <Summary/>
      </Box>

    </Box>
  );
}
