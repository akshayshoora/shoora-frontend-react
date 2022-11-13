import {
    Alert,
    Box,
    Button,
    Grid,
    IconButton,
    Snackbar,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
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
import { isSuperAdmin} from "utils/roleUtils";
import SelectField from "components/commonComponent/SelectField";

class NewUserType {
    "name": string = "";
    "contact_number": string | null = null;
    "contact_code": string | null = null;
    "address": string | null = null;
    "email": string | null = null;
    "password": string | null = null;
    "role_ids": string[] | null = [];
    "organization_id": string | null = null;
}

export default function AddUser() {
    const [users, setUser] = useState<NewUserType>(new NewUserType());
    const { user } = useAppContext();
    const isAdmin = isSuperAdmin(user.roles);


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
        onSuccess: () =>{
            setSnackbar({
                open: true,
                variant: "success",
                message: "User Updated.",
            })
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
                ...userDetails
                });
            },
        }
    );

    function backToProperties() {
        navigate(-1);
    }

    function handleFormUser(
        key: keyof NewUserType,
        value: string | boolean | number | []
    ) {
        setUser({ ...users, [key]: value });
    }

    function addUser(user: NewUserType) {
        return client.post("/users/", {
            ...user,
        });
    }

    function updateUser(user: NewUserType) {
        return client.patch(`/users/${userId}/`, {
            ...user,
        });
    }

    const { mutate: mutateAddUser, isLoading: isAddingUser } =
    addUserMutation;
    const { mutate: mutateUpdateUser, isLoading: updatingUser } =
    updateUserMutation;

    function handleSubmit() {
        if (userId) {
             mutateUpdateUser(users);
            return;
        }
       users.role_ids=["e8612a48-602c-4674-9cc7-d3d6992220e2"];
       users.organization_id=user.organization_id
        mutateAddUser(users);
    }

    if (userId && (loadingUserInfo && !users.name)) {
        return <LoadingScreen />;
    }
    
    async function getUserDetails(id: string) {
        return (await client.get(`/users/${id}/`)).data;
    }

   


    const { name,email} = users;
    const isSaveButtonDisabled = !name || !email ;


    const loadingMessage = isAddingUser
    ? "Adding User..."
    : updatingUser
    ? "Updating User..."
    : "";

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
                    <Typography fontSize={24}>
                        {!userId ? "Add User" : "Edit User"}
                    </Typography>
                </Box>
            </Box>

            <Box className={classes.padding_24}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <TextInput
                            label="User Name"
                            placeholder="Enter User name"
                            style={{ marginBottom: 24 }}
                            value={users.name}
                            isRequired={true}
                            onChange={(value) => handleFormUser("name", value)}
                        />
                    </Grid>
                    {userId ?
                    <Grid item xs={4}>
                        
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
                    :
                    <Grid item xs={4}>
                        
                        <TextInput
                            label="Email"
                            placeholder="Enter Email"
                            style={{ marginBottom: 24 }}
                            value={users.email}
                            isRequired={true}
                            onChange={(value) => handleFormUser("email", value)}
                        />
                        
                    </Grid>
                    }
                    <Grid item xs={4}>
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
                </Grid>
                <Grid container spacing={4}>
                    {!userId &&
                <Grid item xs={4}>
                        <TextInput
                            label="Password"
                            placeholder="Enter Password"
                            style={{ marginBottom: 24 }}
                            value={users.password}
                            isRequired={false}
                            onChange={(value) => handleFormUser("password", value)}
                            
                        />
                    </Grid>
                     }
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
                    <SelectField
                    label="Roles"
                    isLoading={false}
                    menuItems={[]}
                    style={{ marginBottom: 12 }}
                    value={"Roles"}
                    isRequired={true}
                    onChange={(value) => handleFormUser("role_ids", value)}
                  />
                  </Grid>
                  {userId &&
                  <Grid item xs={4}>
                        <TextInput
                            label="Address"
                            placeholder="Enter address"
                            style={{ marginBottom: 24 }}
                            value={users.address}
                            isRequired={false}
                            onChange={(value) => handleFormUser("address", value)}
                        />
                    </Grid>
                  }
                  </Grid>
                  {!userId &&
                  <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <TextInput
                            label="Address"
                            placeholder="Enter address"
                            style={{ marginBottom: 24 }}
                            value={users.address}
                            isRequired={false}
                            onChange={(value) => handleFormUser("address", value)}
                        />
                    </Grid>
                    </Grid>
                 }
                
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
