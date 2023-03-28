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
export function TyreClaimInfo() {
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
            Tyre Claim Details
          </Typography>
        </Box>
        <Box>
          {(roleNameState === "service_manager") && <Button
            size="medium"
            variant="outlined"
            color="primary"
            // variant="contained"
            // style={{ background: "#2e7d32" }}
            onClick={() => { }}
          >
            <VerifiedIcon sx={{ mr: 0.5 }} fontSize="medium" />
            Verify
          </Button>}
          {(roleNameState === "technical_manager" || roleNameState === "consultant") && <Button
            size="medium"
            variant="outlined"
            // variant="contained"
            sx={{ me: 1 }}
            style={{ color: "#2e7d32", borderColor: "#2e7d32" }}
            onClick={() => { }}
          >
            <CancelIcon sx={{ mr: 0.5, color: "#2e7d32" }} fontSize="medium" />
            Approved
          </Button>}
          {(roleNameState === "technical_manager" || roleNameState === "consultant") && <Button
            size="medium"
            variant="outlined"
            // variant="contained"
            style={{ color: "#d32f2f", borderColor: "#d32f2f" }}
            onClick={() => { }}
          >
            <CancelIcon sx={{ mr: 0.5, color: "#d32f2f" }} fontSize="medium" />
            Reject
          </Button>}
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
              <Box className={classes.bodyInfoTitle}>Size:</Box>
              <Box
                className={classes.bodyInfo}
                style={{ textTransform: "capitalize" }}
              >
                12.00R24
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Pattern:</Box>
              <Box className={classes.bodyInfo}>HD580</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Ply rating:</Box>
              <Box className={classes.bodyInfo}>
                20PR 160 / 157K
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Brand:</Box>
              <Box className={classes.bodyInfo}>
                FRONWAY
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Serial Number:</Box>
              <Box className={classes.bodyInfo}>
                D2201B00078
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>DOT code:</Box>
              <Box className={classes.bodyInfo}>
                OIJHDNVYP0222
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Month / week code:</Box>
              <Box className={classes.bodyInfo}>222</Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Invoice number:</Box>
              <Box className={classes.bodyInfo}>
                -
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Remaining NSD - mm:</Box>
              <Box className={classes.bodyInfo}>
                11.36
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Original NSD:</Box>
              <Box className={classes.bodyInfo}>
                15.5
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>% NSD remaining:</Box>
              <Box className={classes.bodyInfo}>
                73.29 %
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>FOB price	:</Box>
              <Box className={classes.bodyInfo}>
                152
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Claim Amount:</Box>
              <Box className={classes.bodyInfo}>
                $111.40
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Technical Finding:</Box>
              <Box className={classes.bodyInfo}>
                BEAD TURNUP CRACKING
              </Box>
            </Box>
            <Box className={classes.infoBodyWrapper}>
              <Box className={classes.bodyInfoTitle}>Remarks if any:</Box>
              <Box className={classes.bodyInfo}>
                NA
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} lg={7} style={{ paddingLeft: 16 }}>
            <Box sx={{ mt: 2, mb: 3 }} component="form">
              <Box className={classes.fieldSetContainer} sx={{ pt: 2, ps: 2 }} component="fieldset">
                <Box sx={{ fontWeight: "bold" }} component="legend">Technical Details</Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>TECHNICAL FINDING CUSTOMER (A):</Box>
                  <Box className={classes.bodyInfo}>-</Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>TECHNICAL FINDINGS FACTORY (B):</Box>
                  <Box sx={{ display: "flex", alignItems: "center" }} className={classes.bodyInfo}>
                    {/* Underinflation Damage */}
                    {(roleNameState === "technical_manager") ? (
                      <TextField
                        fullWidth
                        size="small"
                      />
                    ) : "Underinflation Damage"}
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>TECHNICAL FINDINGS CONSULTANT ©:</Box>
                  <Box sx={{ display: "flex", alignItems: "center" }} className={classes.bodyInfo}>
                    {(roleNameState === "consultant") ? (
                      <TextField
                        fullWidth
                        size="small"
                      />
                    ) : "16"}
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>N.S.D (LEFT) (mm):</Box>
                  <Box className={classes.bodyInfo}>
                    7.5
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>WEAR (LEFT) (%):</Box>
                  <Box className={classes.bodyInfo}>
                    46.88
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>FOB (USD$):</Box>
                  <Box className={classes.bodyInfo}>
                    32
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>C&F (USD$):</Box>
                  <Box className={classes.bodyInfo}>
                    34.40
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>LANDED VALUE (USD$):</Box>
                  <Box className={classes.bodyInfo}>
                    51.94
                  </Box>
                </Box>
                <Box className={classes.infoBodyWrapper}>
                  <Box className={classes.bodyInfoTitle}>CLAIM VALUE (USD$):</Box>
                  <Box className={classes.bodyInfo}>
                    24.35
                  </Box>
                </Box>
                {(roleNameState === "service_manager" || roleNameState === "consultant") && <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    id="submit"
                    className="btn btn-primary"
                    variant="outlined"
                    onClick={() => { }}
                  >
                    Save
                  </Button>
                </Box>}
              </Box>
            </Box>
            <Typography fontSize={18} style={{ textTransform: "capitalize", fontWeight: "bold" }}>
              Tyre Images
            </Typography>
            <ImageList sx={{ width: "100%", height: "auto" }} cols={4} rowHeight={200}>
              {tyresList.map((item: any) => (
                <ImageListItem key={item.id}>
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}