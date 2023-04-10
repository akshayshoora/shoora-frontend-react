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


export default function TermsConditions() {
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
                    <Heading>Terms And Conditions</Heading>
                </Box>
                <p>
                    Welcome to Shoora Technologies. These Terms and Conditions ("Terms") govern your use of our website and services. By accessing our website and/or using our services, you agree to these Terms. If you do not agree to these Terms, you may not use our website or services.
                </p>
                <b>Services</b>
                <p>
                    We provide Fleet Management solutions using Cloud based technology, Machine Learning and Artificial Intelligence. Our services include, but are not limited to, Driver State Monitoring System, Vehicle Tracking, and Fleet Analytics.
                </p>
                <b>User Accounts
                </b>
                <p>
                    To use our services, you must create a user account. You must provide accurate and complete information when creating your account, and you must keep your account information up to date. You are responsible for maintaining the security of your account, including your login credentials.
                </p>
                <b>Payment</b>
                <p>
                    We offer our services on a subscription basis. You agree to pay the fees associated with your subscription in accordance with the payment terms specified at the time of purchase. We may change our fees at any time, but we will notify you in advance of any changes.
                </p>
                <b>Intellectual Property</b>
                <p>Our website and services, including all content, software, and technology, are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or sell any of our content, software, or technology without our prior written consent.</p>
                <b>Confidentiality</b>
                <p>You agree to keep confidential any information provided by us or obtained by you in connection with our services, including any data or analytics relating to your fleet operations. You may not disclose this information to any third party without our prior written consent.</p>
                <b>Disclaimer of Warranties</b>
                <p>We make no warranties, express or implied, regarding our website or services. We do not guarantee that our website or services will be uninterrupted, error-free, or free from viruses or other harmful components. We disclaim all warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                <b>Limitation of Liability</b>
                <p>We are not liable for any damages, whether direct, indirect, incidental, or consequential, arising from your use of our website or services, even if we have been advised of the possibility of such damages. Our total liability to you for any claim arising from your use of our website or services is limited to the amount paid by you for the applicable subscription period.</p>
                <b>Indemnification</b>
                <p>You agree to indemnify and hold us harmless from any and all claims, damages, losses, liabilities, and expenses arising from your use of our website or services, your breach of these Terms, or your violation of any law or regulation.</p>
                <b>Governing Law and Dispute Resolution</b>
                <p>These Terms are governed by the laws of the State of [insert state], without giving effect to any choice of law principles. Any dispute arising from these Terms or your use of our website or services will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
                <b>Changes to these Terms</b>
                <p>We may update these Terms from time to time. We will notify you of any material changes by posting the updated Terms on our website. Your continued use of our website or services after the posting of the updated Terms constitutes your acceptance of the changes.</p>
                <b>Termination</b>
                <p>We may terminate your access to our website and services at any time for any reason, including your breach of these Terms. Upon termination, you must immediately cease all use of our website and services.</p>
                <b>Miscellaneous</b>
                <p>These Terms constitute the entire agreement between you and us regarding your use of our website and services. If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect. Our failure to enforce any provision of these Terms is not a waiver of our right.</p>
            </Box>
        </ Box>
    )
}