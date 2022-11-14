import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";

export default function Partner() {
  const classes = useStyles();

  return (
    <Box style={{ padding: "20px 40px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Partner</Heading>
      </Box>
    </Box>
  );
}
