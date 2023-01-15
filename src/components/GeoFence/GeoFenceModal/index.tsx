import * as React from "react";

import {
  Autocomplete,
  Box,
  Grid,
  TextField,
  Modal,
  Button,
  Paper,
  styled,
  Typography,
  Alert,
  Snackbar,
  SelectChangeEvent,
} from "@mui/material";
import useStyles from "./style";
import { auth, transport } from "constants/RouteMiddlePath";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import client from "serverCommunication/client";
import { useMutation, useQuery } from "react-query";
import { useAppContext } from "ContextAPIs/appContext";
import { AppPaths } from "constants/commonEnums";
import { useNavigate } from "react-router-dom";
import PageLoading from "components/commonComponent/PageLoading";

interface IGeofenceProps {
  handleClose: () => void;
  selectedItem: any;
  open: boolean;
}

interface IGeofenceAutocomplete {
  id: number;
  label: string;
  value: string;
}

class NewGeofenceVehicleType {
  "vehicle_ids": any[] = [];
  "vehicle_group_ids": any[] = [];
  "geofence_id": string;
  "organization_id": string;
  "branch_id": string;
  "alert_type": IGeofenceAutocomplete;
}

class Vehicles {
  id: string = "";
  label: string = "";
  value = "";
}

export function GeoFenceModal(props: IGeofenceProps) {
  const { selectedItem } = props;
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    bgcolor: "background.paper",
    border: "2px solid #FFFFFF",
    boxShadow: 24,
    pt: 1,
    px: 2,
    pb: 2,
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchText, setSearchText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [geoVehicleList, setGeoVehicleList] = React.useState<any[]>([]);
  const [alertType, setAlertType] = React.useState();
  const { user } = useAppContext();

  const [geofenceVehicleData, setGeofenceVehicleData] =
    React.useState<NewGeofenceVehicleType>(new NewGeofenceVehicleType());

  const [snackbar, setSnackbar] = React.useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const navigate = useNavigate();
  const { data: vehicleList, isLoading } = useQuery(
    ["vehicle", page, rowsPerPage, searchText],
    () => getVehicles(page, rowsPerPage, searchText),
    { refetchOnWindowFocus: false }
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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(4, 2, 2),
    color: theme.palette.text.secondary,
    position: "relative",
    boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
    alertHead: {
      display: "flex",
      justifyContent: "center",
    },
  }));
  const classes = useStyles();

  const alertOptions = [
    {
      id: 1,
      label: "In Alert",
      value: "IN_ALERT",
    },
    {
      id: 2,
      label: "Out Alert",
      value: "OUT_ALERT",
    },
    {
      id: 3,
      label: "Both",
      value: "BOTH",
    },
  ];

  React.useEffect(() => {
    if (!vehicleList) return;
    let filterArr: any[] = [];
    const arrVehicle = vehicleList.results;
    for (let i in arrVehicle) {
      filterArr.push({
        label: arrVehicle[i]?.vin,
        id: arrVehicle[i]?.id,
        value: arrVehicle[i]?.id,
      });
      setGeoVehicleList(filterArr);
    }
  }, [vehicleList]);

  function handleFormGeofenceVehicle(
    key: keyof NewGeofenceVehicleType,
    value:
      | string
      | boolean
      | number
      | string[]
      | SelectChangeEvent<string[]>
      | IGeofenceAutocomplete
  ) {
    setGeofenceVehicleData({ ...geofenceVehicleData, [key]: value });
  }

  function addGeofenceVehilce(geofenceVehicle: NewGeofenceVehicleType) {
    console.log("sjdhbfjsdkks");
    return client.post(`${transport}/vehicle-geofences/`, {
      ...geofenceVehicle,
    });
  }

  const addGeofenceVehicleMutation = useMutation(addGeofenceVehilce, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Geofence added successfully.",
      });

      setTimeout(() => {
        navigate(`/${AppPaths.GEOFENCE}`);
      }, 2000);
    },
    onError: (error) => {
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      });
    },
  });

  const {
    mutate: mutateAddGeofenceVehicle,
    isLoading: isAddingGeofenceVehicle,
  } = addGeofenceVehicleMutation;
  const getVehicleId = (vehicles: Vehicles[]) => {
    const arr: string[] = [];
    for (let i = 0; i < vehicles.length; i++) {
      arr.push(vehicles[i].value);
    }
    return arr;
  };

  const handleSubmit = () => {
    geofenceVehicleData.organization_id = user.organization_id;
    geofenceVehicleData.vehicle_group_ids = getVehicleId(
      geofenceVehicleData.vehicle_ids
    );
    geofenceVehicleData.vehicle_ids = getVehicleId(
      geofenceVehicleData.vehicle_ids
    );
    geofenceVehicleData.geofence_id = selectedItem.id;

    mutateAddGeofenceVehicle(geofenceVehicleData);
  };

  const loadingMessage = isAddingGeofenceVehicle
    ? "Adding Geofence Vehicle..."
    : "";

  return (
    <Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.variant}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <PageLoading
        open={isAddingGeofenceVehicle}
        loadingMessage={loadingMessage}
      />
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              className={classes.alertHead}
              variant="h6"
              component="h2"
            >
              Assign Vehicle{" "}
              <i onClick={props.handleClose}>
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.9" filter="url(#filter0_d_2762_100820)">
                    <path
                      d="M18 6L6 18M6 6L18 18"
                      stroke="#fff"
                      stroke-linecap="square"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_2762_100820"
                      x="-4"
                      y="-2"
                      width="32"
                      height="32"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_2762_100820"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_2762_100820"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </i>
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 6, sm: 8, md: 12 }}
              style={{ marginTop: -10 }}
            >
              <Grid xs={12} sm={12} md={12} style={{ paddingLeft: 24 }}>
                <Item elevation={1}>
                  <Box>
                    <Typography>
                      Geofence name : {selectedItem?.name}
                    </Typography>
                    <Autocomplete
                      multiple
                      value={geofenceVehicleData.vehicle_ids}
                      id="combo-box-demo"
                      options={geoVehicleList}
                      style={{
                        marginTop: "20px",
                        marginBottom: "10px",
                      }}
                      onChange={(e, value: any) => {
                        handleFormGeofenceVehicle("vehicle_ids", value);
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="select vehicle" />
                      )}
                    />
                  </Box>
                  <Box>
                    <Autocomplete
                      id="combo-box-demo"
                      options={alertOptions}
                      style={{
                        marginTop: "20x",
                        marginBottom: "10px",
                      }}
                      value={alertType}
                      onChange={(e, value: any) => {
                        setAlertType(value);
                        handleFormGeofenceVehicle("alert_type", value?.value);
                      }}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Alert type" />
                      )}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    style={{ color: "#fff", marginTop: "5px" }}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    Save
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Box>
        )}
      </Modal>
    </Box>
  );
}
