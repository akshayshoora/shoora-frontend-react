import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Chip from "@mui/material/Chip";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useAppContext } from "ContextAPIs/appContext";

export default function Trip() {
  const classes = useStyles();
  const { user } = useAppContext();

  return (
    <Box style={{ padding: "20px 40px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Trip (Under Deelopment)</Heading>
        </Box>
    </Box>
  );
}
