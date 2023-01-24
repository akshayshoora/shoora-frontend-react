import * as React from "react";
import Grid from "@mui/material/Grid";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useQuery } from "react-query";

import { getRoleBasedFilteredSummary } from "../.../../../constants/commonConstants";

import client from "serverCommunication/client";
import { useAppContext } from "ContextAPIs/appContext";
import COLORS from "constants/colors";
import { monitor } from "constants/RouteMiddlePath";
import { data } from "components/PieCharts";
import LoadingScreen from "components/commonComponent/LoadingScreen";

import { dashboardSummary } from "utils/helpers";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(4, 2, 2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
}));

const StatsIcon = styled("div")(({ theme }) => ({
  float: "right",
  position: "absolute",
  top: 16,
  right: 16,
  borderRadius: 50,
  width: 45,
  height: 45,
  boxSizing: "border-box",
  padding: 10,
  background: COLORS.GRADIENT,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function Summary() {
  const { data: summary, isLoading } = useQuery(["summary"], () => getStats());
  const { user } = useAppContext();

  const ROLE_BASED_FILTERED_SUMMARY = getRoleBasedFilteredSummary();

  async function getStats() {
    return (await client.get(`${monitor}/trips-stats/`)).data;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {ROLE_BASED_FILTERED_SUMMARY.map((item) => {
        console.log('--item--',item)
        return (
          <Grid item xs={2} sm={3} md={3} key={item.dataIndex}>
            <Item elevation={0}>
              <Typography variant="subtitle1" fontSize={14} component="div">
                {item.label}
              </Typography>
              <Typography variant="h1" mt={1} component="div">
                {dashboardSummary(summary[item.dataIndex],item.dataIndex)}
                {/* {summary[item.dataIndex]} */}
                {item.unit ? (
                  <Typography
                    variant="body1"
                    mt={1}
                    ml={1}
                    color="text.secondary"
                    component="span"
                  >
                    {item.unit}
                  </Typography>
                ) : (
                  ""
                )}
              </Typography>
              <StatsIcon>
                <img src={item.icon} alt="" height={32} width={32} />
              </StatsIcon>
            </Item>
          </Grid>
        );
      })}
    </Grid>
  );
}
