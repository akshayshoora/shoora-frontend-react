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


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  position: "relative",
  boxShadow: "0 0.75rem 1.5rem rgb(18 38 63 / 3%)",
  alertHead: {
    display: "flex",
    justifyContent: "center",
  },
}));
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


export function GeoFenceModal(props: IGeofenceProps) {
  const { selectedItem } = props;

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
    let getApiUrl = `${transport}/vehicles/?search=${searchText}`;
    const response = await client.get(getApiUrl);

    return response.data;
  }

  const classes = useStyles();
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
    return client.post(`${transport}/vehicle-geofences/`, {
      ...geofenceVehicle,
    });
  }

  const addGeofenceVehicleMutation = useMutation(addGeofenceVehilce, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "Vehicle assigned successfully.",
      });

      setTimeout(() => {
        props.handleClose();
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
    // geofenceVehicleData.vehicle_group_ids = getVehicleId(
    //   geofenceVehicleData.vehicle_ids
    // );
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
          sx={{ width: "70%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <PageLoading
        open={isAddingGeofenceVehicle}
        loadingMessage={loadingMessage}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Box >

          <Box sx={{ boxShadow: 1, p: 2, backgroundColor: '#ffffff', borderRadius: 2 }}>
            <Box>
              <Typography
                id="modal-modal-title"
                className={classes.alertHead}
                variant="h6"
                component="h2"
              >
                Assign Vehicle{" "}
              </Typography>
            </Box>
            <Box>
              <Autocomplete
                multiple
                value={geofenceVehicleData.vehicle_ids}
                id="combo-box-demo"
                options={geoVehicleList}
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                onChange={(e, value: any) => {
                  handleFormGeofenceVehicle("vehicle_ids", value);
                }}
                sx={{ width: "100%" }}
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
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="Alert type" />
                )}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <Button
                variant="contained"
                style={{ color: "#fff", marginTop: "5px" }}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save
              </Button>
            </Box>

          </Box>

        </Box>
      )}
    </Box>
  );
}
