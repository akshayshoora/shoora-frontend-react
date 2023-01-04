import {
  Alert,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Key, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import TextInput from "components/commonComponent/TextInput";
import client from "serverCommunication/client";
import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { AppPaths } from "../../../constants/commonEnums";
import PageLoading from "components/commonComponent/PageLoading";
import LoadingScreen from "components/commonComponent/LoadingScreen";
import { useAppContext } from "ContextAPIs/appContext";
import SelectField from "components/commonComponent/SelectField";
import { auth } from "constants/RouteMiddlePath";

class NewUserType {
  "name": string = "";
  "contact_number": string | null = null;
  "contact_code": string | null = null;
  "address": string | null = null;
  "email": string | null = null;
  "password"?: string | null = null;
  "role_ids": string[] = [];
  "roles": string[] = [];
  "organization_id": string | null = null;
}

export default function AddUser() {
  const [users, setUser] = useState<NewUserType>(new NewUserType());
  const { user } = useAppContext();
  const { data: roleList, isLoading: loadingRoleInfo } = useQuery(
    ["roles"],
    async () => await getRoles()
  );
  const navigate = useNavigate();
  const classes = useStyles();
  const { id: userId } = useParams();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    variant: "success" | "error" | "info";
    message: string;
  }>({ open: false, variant: "info", message: "" });

  const addUserMutation = useMutation(addUser, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "User added successfully.",
      });

      setTimeout(() => {
        navigate(`/${AppPaths.USERS}`);
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

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      setSnackbar({
        open: true,
        variant: "success",
        message: "User Updated.",
      });
      setTimeout(() => {
        navigate(`/${AppPaths.USERS}`);
      }, 2000);
    },

    onError: () =>
      setSnackbar({
        open: true,
        variant: "error",
        message: "Something went wrong.",
      }),
  });

  const { isLoading: loadingUserInfo } = useQuery(
    ["users", userId],
    () => getUserDetails(String(userId)),
    {
      enabled: Boolean(userId),
      refetchOnWindowFocus: false,
      onSuccess: (userDetails) => {
        setUser({
          ...users,
          ...userDetails,
        });
      },
    }
  );
  function backToProperties() {
    navigate(-1);
  }

  function handleFormUser(
    key: keyof NewUserType,
    value: string | boolean | number | string[] | SelectChangeEvent<string[]>
  ) {
    setUser({ ...users, [key]: value });
  }

  function addUser(user: NewUserType) {
    return client.post(`${auth}/users/`, {
      ...user,
    });
  }

  function updateUser(user: NewUserType) {
    delete user.password;
    return client.patch(`${auth}/users/${userId}/`, {
      ...user,
    });
  }

  function getRoleNamesByID(roleId: string[]) {
    let roleIdArr: string[] = [];
    roleId.map((itm: any) => {
      roleIdArr.push(itm.id);
    });
    return roleIdArr;
  }
  const { mutate: mutateAddUser, isLoading: isAddingUser } = addUserMutation;
  const { mutate: mutateUpdateUser, isLoading: updatingUser } =
    updateUserMutation;

  function handleSubmit() {
    users.roles = users.role_ids;
    if (userId) {
      mutateUpdateUser(users);
      return;
    }
    users.organization_id = user.organization_id;

    mutateAddUser(users);
  }

  if (userId && loadingUserInfo && !users.name) {
    return <LoadingScreen />;
  }

  async function getUserDetails(id: string) {
    return (await client.get(`${auth}/users/${id}/`)).data;
  }

  async function getRoles() {
    return (await client.get(`${auth}/roles/`)).data;
  }

  function GoToBack() {
    navigate(-1);
  }

  const { name, email } = users;
  const isSaveButtonDisabled = !name || !email;

  const loadingMessage = isAddingUser
    ? "Adding User..."
    : updatingUser
    ? "Updating User..."
    : "";

  console.log(users.role_ids, "rolesss");

  return (
    <Box className={classes.positionRelative}>
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
        open={isAddingUser || updatingUser}
        loadingMessage={loadingMessage}
      />

      <Box className={classes.headingWrapper}>
        <Box className={classes.headingContent}>
          <IconButton
            className={classes.headingBackButton}
            size="small"
            onClick={GoToBack}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography fontSize={24}>
            {!userId ? "Add User" : "Edit User"}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.padding_24}>
      <Box className={classes.formContainer}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextInput
              label="User Name"
              placeholder="Enter User name"
              style={{ marginBottom: 24 }}
              value={users.name}
              isRequired={true}
              onChange={(value) => handleFormUser("name", value)}
            />
          </Grid>
          {userId ? (
            <Grid item xs={3}>
              <TextInput
                label="Email"
                placeholder="Enter Email"
                style={{ marginBottom: 24 }}
                value={users.email}
                isRequired={false}
                disabled
                onChange={(value) => {}}
              />
            </Grid>
          ) : (
            <Grid item xs={3}>
              <TextInput
                label="Email"
                placeholder="Enter Email"
                style={{ marginBottom: 24 }}
                value={users.email}
                isRequired={true}
                onChange={(value) => handleFormUser("email", value)}
              />
            </Grid>
          )}
          <Grid item xs={3}>
            <TextInput
              label="Contact"
              placeholder="Enter contact number"
              regex={/[^0-9]/g}
              style={{ marginBottom: 24 }}
              value={users.contact_number}
              isRequired={false}
              onChange={(value) => handleFormUser("contact_number", value)}
            />
          </Grid>
          {!userId && (
            <Grid item xs={3}>
              <TextInput
                label="Password"
                placeholder="Enter Password"
                style={{ marginBottom: 24 }}
                value={users.password}
                isRequired={false}
                onChange={(value) => handleFormUser("password", value)}
              />
            </Grid>
          )}
          <Grid item xs={3}>
            <TextInput
              label="Contact Code"
              placeholder="Enter Contact Code"
              regex={/[^0-9]/g}
              style={{ marginBottom: 24 }}
              value={users.contact_code}
              isRequired={false}
              onChange={(value) => handleFormUser("contact_code", value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography
              fontSize={16}
              style={{ fontWeight: 200, marginBottom: 10, marginRight: 2 }}
            >
              Select Roles
            </Typography>
            <Select
              multiple
              fullWidth
              id="demo-simple-select"
              value={users.role_ids}
              onChange={(e: any) =>
                handleFormUser(
                  "role_ids",
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
              }
              size="small"
            >
              <MenuItem selected value="" disabled>
                Select Roles
              </MenuItem>
              {loadingRoleInfo ? (
                <MenuItem>
                  <CircularProgress />
                </MenuItem>
              ) : roleList?.results.length ? (
                roleList?.results.map((item: any) => (
                  <MenuItem style={{ fontSize: 14 }} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>Nothing to Select</MenuItem>
              )}
            </Select>
          </Grid>

          {userId && (
            <Grid item xs={3}>
              <TextInput
                label="Address"
                placeholder="Enter address"
                style={{ marginBottom: 24 }}
                value={users.address}
                isRequired={false}
                onChange={(value) => handleFormUser("address", value)}
              />
            </Grid>
          )}
        {!userId && (
            <Grid item xs={3}>
              <TextInput
                label="Address"
                placeholder="Enter address"
                style={{ marginBottom: 24 }}
                value={users.address}
                isRequired={false}
                onChange={(value) => handleFormUser("address", value)}
              />
            </Grid>
        )}
         </Grid>
      </Box>
      </Box>

      <Box className={classes.footerWrapper}>
        <Button style={{ marginRight: 12 }} onClick={backToProperties}>
          Cancel
        </Button>
        <Button
          id="submit"
          variant={isSaveButtonDisabled ? "outlined" : "contained"}
          onClick={handleSubmit}
          disabled={isSaveButtonDisabled}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
