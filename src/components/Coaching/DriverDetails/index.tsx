import { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, Grid, TextField } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import { useQuery } from "react-query";
import client from "serverCommunication/client";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { transport } from "constants/RouteMiddlePath";
import { driverLicenseInfo } from "./helper";
import DrivingHistory from "./DriverHistory";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import VerifiedIcon from '@mui/icons-material/Verified';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAppContext } from "ContextAPIs/appContext";
import PerformanceTable from "../PerformanceTable";
//Images
import Tyre1 from "../../../assets/tyre/tyre1.png";
import Tyre2 from "../../../assets/tyre/tyre2.png";
import Tyre3 from "../../../assets/tyre/tyre3.png";
import Tyre4 from "../../../assets/tyre/tyre4.png";
import Tyre5 from "../../../assets/tyre/tyre5.png";
import Tyre6 from "../../../assets/tyre/tyre6.png";
import Tyre7 from "../../../assets/tyre/tyre7.png";


const tyresList = [
  {
    id: "1",
    src: Tyre1,
    title: "Tyre 1"
  },
  {
    id: "2",
    src: Tyre2,
    title: "Tyre 2"
  },
  {
    id: "3",
    src: Tyre3,
    title: "Tyre 3"
  },
  {
    id: "4",
    src: Tyre4,
    title: "Tyre 4"
  },
  {
    id: "5",
    src: Tyre5,
    title: "Tyre 5"
  }
  ,
  {
    id: "6",
    src: Tyre6,
    title: "Tyre 6"
  },
  {
    id: "7",
    src: Tyre7,
    title: "Tyre 7"
  }
]

const userRoles = ["service_manager", "technical_manager", "consultant"];
export function TyrePerfomanceInfo() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [roleNameState, setRoleNameState] = useState("");
  const { user } = useAppContext();

  const { id } = useParams();

  // const { data: driverDetails, isLoading } = useQuery(
  //   ["driverDetail", id],
  //   () => getDriverDetails(String(id))
  // );

  useEffect(() => {
    if (user) {
      const { roles } = user;
      if (Array.isArray(roles)) {
        const roleDetails = roles.find((item: any) => userRoles.includes(item.name));
        if (roleDetails) {
          const { name } = roleDetails;
          setRoleNameState(name);
        }
      }
    }
  }, [user]);
  async function getDriverDetails(id: string) {
    return (await client.get(`${transport}/drivers/${id}/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Box>
      <Box className={classes.headingWrapper}>
        <Box className={classes.headingContent}>
          <IconButton
            className={classes.headingBackButton}
            size="small"
            onClick={GoToBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography fontSize={24} style={{ textTransform: "capitalize" }}>
            Tyre Performance Details
          </Typography>
        </Box>
        <Box>
          {/* <Button
            variant="outlined"
            onClick={() => { }}
          >
            Verify
          </Button> */}
        </Box>
      </Box>
      <Box className={classes.bodyContent}>
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3 }}
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          style={{ marginTop: 24 }}
        >
          <Grid xs={12} sm={12} lg={5} style={{ paddingLeft: 24 }}>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Fleet Name :</Box>
              <Box
                className={classes.bodyInfo}
                style={{ textTransform: "capitalize" }}
              >
                -
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Country:</Box>
              <Box className={classes.bodyInfo}>UAE</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Customer type:</Box>
              <Box className={classes.bodyInfo}>

              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Size:</Box>
              <Box className={classes.bodyInfo}>
                385/65R22.5
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Pattern:</Box>
              <Box className={classes.bodyInfo}>
                18
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Ply rating:</Box>
              <Box className={classes.bodyInfo}>
                SSR1
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Brand:</Box>
              <Box className={classes.bodyInfo}>MRF</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Serial Number:</Box>
              <Box className={classes.bodyInfo}>
                -
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>DOT code:</Box>
              <Box className={classes.bodyInfo}>
                -
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Month/week code:</Box>
              <Box className={classes.bodyInfo}>

              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Invoice number:</Box>
              <Box className={classes.bodyInfo}>
                -
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Original NSD :</Box>
              <Box className={classes.bodyInfo}>
                16
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Odometer at fitment:</Box>
              <Box className={classes.bodyInfo}>
                5,00,000
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} lg={7} style={{ paddingLeft: 16 }}>
            <Box sx={{ mt: 2, mb: 3 }} component="form">
              <Box className={classes.fieldSetContainer} sx={{ pt: 2, ps: 2 }} component="fieldset">
                <Box sx={{ fontWeight: "bold" }} component="legend">Performance Details</Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Test:</Box>
                  <Box className={classes.bodyInfo}>UM1</Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }} className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Test Start Date:</Box>
                  <Box className={classes.bodyInfo}>
                    23-Jan-23
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }} className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Test End Date:</Box>
                  <Box className={classes.bodyInfo}>
                    23-Mar-23
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Vehicle:</Box>
                  <Box className={classes.bodyInfo}>

                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>No of axles on Vehicle:</Box>
                  <Box className={classes.bodyInfo}>
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Pay Load:</Box>
                  <Box className={classes.bodyInfo}>

                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Gross Load:</Box>
                  <Box className={classes.bodyInfo}>

                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>No Of Wheels/Vehicle Configuration :</Box>
                  <Box className={classes.bodyInfo}>
                    51.94
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Cargo Carried :</Box>
                  <Box className={classes.bodyInfo}>
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Mine type :</Box>
                  <Box className={classes.bodyInfo}>
                    Iron, Coal, Limestone etc
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>Reason of removal :</Box>
                  <Box className={classes.bodyInfo}>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ px: 3, mb: 3 }}>
        <PerformanceTable />
      </Box>
    </Box>
  );
}