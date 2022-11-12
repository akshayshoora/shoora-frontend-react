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
} from "@mui/material";
import Span from "components/commonComponent/Span";
import { AppPaths } from "../../constants/commonEnums";
import { useAppContext } from "ContextAPIs/appContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "serverCommunication/client";
import { setUserId, setUserToken } from "utils/localStorage";
import BRAND from "BrandingConstants";
import useStyles from "./style";
import { USER_ID } from "constants/commonConstants";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginImg from '../../assets/truck3.jpg';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setAlert] = useState(false);
  const [loading, showLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { setUser, user } = useAppContext();

  const classes = useStyles();

  const navigate = useNavigate();

  const isHost = window.location.origin.includes("host");

  useEffect(() => {
    if (user.id && localStorage.getItem(USER_ID)) {
      navigate(`/${AppPaths.DASHBOARD}`);
      return;
    }
    navigate(`/${AppPaths.LOGIN}`);
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();

    showLoading(true);
    const data = {
      email: email,
      password: password,
    };
    client
      .post("/token/", data)
      .then((response) => {
        const {data} = response;
        setUserToken(data.access);
        setUserId(data.id);
        setUser();
        navigate(`/${AppPaths.DASHBOARD}`);
      })
      .catch(() => {
        setAlert(true);
      })
      .finally(() => {
        showLoading(false);
      });
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setAlert(false);
  };

  return (
    <Box className={classes.root}>
      <Box component={"span"}>
        <img src={BRAND.LOGO} alt="shoora" width={100}/>
        
      </Box>
      <Box className={classes.loginBoxMain}>
      <Box className={classes.loginLeft}>
        <img src={LoginImg} alt="" style={{ maxWidth: '100%' }}></img>
      </Box>
      <Box className={classes.loginBoxWrapper}>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Span size="large">Welcome to Shoora</Span>
          
        </Box>
        <Box>
          <form className={classes.loginForm} onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="text"
              style={{ marginTop: 36 }}
              value={email}
              // focused
              /**
               //@ts-ignore */
              onInput={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              style={{ marginTop: 24 }}
              value={password}
              /**
               //@ts-ignore */
              onInput={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</InputAdornment>,
                classes: {
                  adornedEnd: classes.adornedEnd
                }
              }}
            />
            <Button className={classes.shooraBtn}
              variant="contained"
              style={{ marginTop: 12 }}
              type="submit"
              disabled={!email.length || !password.length}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Sign In"
              )}
            </Button>

            {isHost ? (
              <Box className={classes.marginTop_8}>
                <Span fontType="secondary" size="extra-small">
                  <span style={{ textTransform: "none" }}>
                   <Link> Forget password?</Link>{" "}

                  </span>
                </Span>
              </Box>
            ) : null}
          </form>
        </Box>

        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={showAlert}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Alert onClose={handleClose} severity="error">
              Invalid Credentials!
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
      </Box>
    </Box>
  );
}
