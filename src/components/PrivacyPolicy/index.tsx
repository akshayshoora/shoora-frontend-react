import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Link,
    Snackbar,
    Stack,
    TextField,
    InputAdornment,
    Typography
} from "@mui/material";
import Span from "components/commonComponent/Span";
import { AppPaths } from "../../constants/commonEnums";
import { useAppContext } from "ContextAPIs/appContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "serverCommunication/client";
import { setUserId, setUserToken, setIsShipper, setCanPollNotification, setUserName } from "utils/localStorage";
import BRAND from "BrandingConstants";
import Heading from "components/commonComponent/Heading";
import useStyles from "./style";
import { USER_ID, USER_NAME } from "constants/commonConstants";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LoginImg from "../../assets/macbook-pro.png";
import { auth } from "constants/RouteMiddlePath";


export default function PrivacyPolicy() {
    const classes = useStyles();
    return (
        <Box className={classes.privacyContainer}>
            <Box className={classes.headerContainer}>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Box component={"span"}>
                        <img src={BRAND.LOGO} alt="shoora" className={classes.brandLogo} />
                    </Box>
                    <Typography variant="h5" sx={{ ml: 1 }} className="primary" >
                        <Heading>Shoora Technology</Heading>
                    </Typography>
                </Box>
            </Box>
            <Box className={classes.bodyContainer}>
                <Box style={{ textAlign: "center" }}>
                    <Heading>Privacy Policy</Heading>
                </Box>
                <p>
                    At Shoora Technologies, we value the privacy of our clients and are committed to protecting their personal information. This Privacy Policy outlines our practices regarding the collection, use, and disclosure of personal information. By accessing our website and/or using our services, you agree to this Privacy Policy.
                </p>
                <b>Information We Collect</b>
                <p>
                    We may collect personal information such as your name, email address, phone number, and billing information when you sign up for our services or contact us. We may also collect information about your fleet operations, including vehicle information, driver information, and location data.
                </p>
                <p>
                    We use cookies and other tracking technologies to collect information about your browsing behavior, such as pages visited and time spent on our website. This information is used to improve our website and services.
                </p>
                <b>How We Use Your Information</b>
                <p>
                    We use your personal information to provide and improve our services, to communicate with you, and to process payments. We may also use your information for research and analytics purposes to improve our products and services.
                </p>
                <p>We do not sell your personal information to third parties.</p>
                <b>How We Share Your Information</b>
                <p>
                    We may share your personal information with our service providers, such as payment processors and hosting providers, to provide our services. We may also share your information with our partners and affiliates to improve our products and services.
                </p>
                <p>
                    We may disclose your personal information to comply with legal requirements, such as a court order or subpoena, or to protect our rights or the rights of others.
                </p>
                <b>Security</b>
                <p>
                    We take reasonable measures to protect your personal information from unauthorized access, use, and disclosure. However, no security measures are 100% effective, and we cannot guarantee the security of your information.
                </p>
                <b>Your Rights</b>
                <p>You have the right to access, correct, and delete your personal information. You may also have the right to restrict the processing of your information and to receive a copy of your information in a structured, machine-readable format.
                </p>
                <p>
                    To exercise these rights, please contact us at [insert contact information].
                </p>
                <b>
                    Changes to this Privacy Policy
                </b>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated Privacy Policy on our website.
                </p>
                <b>Contact Us</b>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at info@shoora.com
                </p>
            </Box>
        </ Box>
    )
}