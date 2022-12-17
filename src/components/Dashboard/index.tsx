import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import useStyles from "./style";
import Heading from "components/commonComponent/Heading";
import Chip from "@mui/material/Chip";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Users from "components/Users";

import Summary from "../Summary";
import { useAppContext } from "ContextAPIs/appContext";
import Charts from "components/Charts";
import PieCharts from "components/PieCharts"
import Iframe from "react-iframe";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4,2, 2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow:'0 0.75rem 1.5rem rgb(18 38 63 / 3%)',
}));

export default function Dashboard() {
  const classes = useStyles();
  const { user } = useAppContext();

  return (
    <Box style={{ padding: "20px 40px" }}>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <Heading>Dashboard</Heading>
      </Box>
      <Box className={classes.root}>
        <Summary />
      </Box>

      <Box className={classes.root}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, sm: 8, md: 12 }} style={{ marginTop: 24 }}
        >
          <Grid xs={2} sm={6} md={6} style={{ paddingLeft: 24 }}>
            <Item elevation={1}>
              <Charts />
            </Item>
          </Grid>
          <Grid xs={2} sm={6} md={6} style={{ paddingLeft: 24 }}>
            <Item elevation={0}>
              <PieCharts />
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.usrTable}>
        <Users />
      </Box>
    </Box>
  );
}
