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
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import TextInput from "components/commonComponent/TextInput";
import client from "serverCommunication/client";
import useStyles from "./style";
import { useNavigate, useParams } from "react-router-dom";
import PageLoading from "components/commonComponent/PageLoading";
import LoadingScreen from "components/commonComponent/LoadingScreen";

class UserType {
    id: string = '';
    name: string = '';
    email: string = '';
    mobile_number: number = 0;
    pincode: number = 0;
    address: string = '';
    host_ids: string[] = [];
    property_ids: string[] = [];
    gstin: string = '';
}

export default function EditProfile() {
    const [userData, setUserData] = useState<UserType>(new UserType());

    const navigate = useNavigate();
    const classes = useStyles();
    const { id: userId } = useParams();

    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        variant: "success" | "error" | "info";
        message: string;
    }>({ open: false, variant: "info", message: "" });

    const updateUserMutation = useMutation(updateUser, {
        onSuccess: () =>
            setSnackbar({
                open: true,
                variant: "success",
                message: "User Updated.",
            }),
        onError: () =>
            setSnackbar({
                open: true,
                variant: "error",
                message: "Something went wrong.",
            }),
    });

    const { isLoading: loadingUserInfo } = useQuery(
        ["user", userId],
        () => getUserDetails(String(userId)),
        {
            enabled: Boolean(userId),
            refetchOnWindowFocus: false,
            onSuccess: (userDetails) => {
                console.log(userDetails);
                setUserData({
                    ...userData,
                    ...userDetails,
                });
                console.log(userData);
            },
        }
    );

    function backToDashboard() {
        navigate(-1);
    }

    function handleFormUser(
        key: keyof UserType,
        value: string | boolean | number | []
    ) {
        setUserData({ ...userData, [key]: value });
    }

    function updateUser(userData: UserType) {
        const body = {
            "name": userData.name,
            "email": userData.email,
            "pincode": userData.pincode,
            "gstin": userData.gstin,
            "address": userData.address
        };

        return client.patch(`/users/${userId}/`, {
            ...body,
        });
    }

    const { mutate: mutateUpdateUser, isLoading: updatingUser } =
    updateUserMutation;

    function handleSubmit() {
        if (userId) {
            mutateUpdateUser(userData);
            return;
        }
    }

    if (userId && (loadingUserInfo && !userData.name)) {
        return <LoadingScreen />;
    }
    
    async function getUserDetails(id: string) {
        return (await client.get(`/users/${id}/`)).data;
    }

    const { name, email, mobile_number } = userData;
    const isSaveButtonDisabled = !name || !email || !mobile_number;

    const loadingMessage = updatingUser
    ? "Updating User Profile..."
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
                open={updatingUser}
                loadingMessage={loadingMessage}
            />

            <Box className={classes.headingWrapper}>
                <Box className={classes.headingContent}>
                    <IconButton
                        className={classes.headingBackButton}
                        size="small"
                        onClick={backToDashboard}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography fontSize={24}>
                        Edit Profile Information
                    </Typography>
                </Box>
            </Box>

            <Box className={classes.padding_24}>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <TextInput
                            label="Name"
                            placeholder="Enter name"
                            style={{ marginBottom: 24 }}
                            value={userData.name}
                            isRequired={true}
                            onChange={(value) => handleFormUser("name", value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            label="Address"
                            placeholder="Enter address"
                            style={{ marginBottom: 24 }}
                            value={userData.address}
                            isRequired={false}
                            onChange={(value) => handleFormUser("address", value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <TextInput
                            label="Contact"
                            placeholder="Enter contact number"
                            regex={/[^0-9]/g}
                            style={{ marginBottom: 24 }}
                            value={userData.mobile_number}
                            isRequired={true}
                            disabled={true}
                            onChange={() => {}}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextInput
                            label="Email"
                            placeholder="Enter email"
                            style={{ marginBottom: 24 }}
                            value={userData.email}
                            isRequired={true}
                            onChange={(value) => handleFormUser("email", value)}
                        />
                    </Grid>
                </Grid>
            </Box>

            <Box className={classes.footerWrapper}>
                <Button style={{ marginRight: 12 }} onClick={backToDashboard}>
                    Cancel
                </Button>
                <Button
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
