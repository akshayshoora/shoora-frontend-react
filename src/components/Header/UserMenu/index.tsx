import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useAppContext } from "ContextAPIs/appContext";
import useStyles from "./style";
import { setUserId, setUserToken, getUserToken } from "utils/localStorage";
import { useNavigate } from "react-router-dom";
import { AppPaths, SubPaths } from "../../../constants/commonEnums";
import client from "serverCommunication/client";

export default function UserMenu() {
  const classes = useStyles();
  const { user, setUser } = useAppContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function editProfile() {
    handleClose();
    const id = user.id;
    navigate(`/${AppPaths.PROFILE}/${SubPaths.EDIT}/${id}`);
  }

  async function logout() {
    handleClose();
    const userToken = getUserToken();
    // const data = (await client.post("/users/logout/", {
    //     userToken,
    // }));

    // if(data.status === 205) {
    localStorage.clear();
    setUserId("");
    setUserToken("");
    setUser();
    navigate(`/${AppPaths.LOGIN}`);
    // }
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          margin: "0px",
        }}
      >
        <IconButton
          disableRipple
          onClick={handleClick}
          className={classes.avatarButton}
          size="small"
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} className={classes.avatar}>
            {user.name ? user.name[0].toUpperCase() : "U"}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            border: "2px solid #D7D6E1",
            borderRadius: "6px",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: -2,
              right: 12,
              width: 5,
              height: 5,
              borderLeft: "2px solid #D7D6E1",
              borderTop: "2px solid #D7D6E1",
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            "&.MuiPaper-root": {
              position: "absolute",
              top: "47px !important",
            },
          },
        }}
        className={classes.actionDropdown}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={classes.userWrapper}>
          <p className={classes.userName}>{user.name}</p>
          <p>Login ID: {user.email}</p>
          <p style={{ textTransform: "capitalize" }}>
            {/* {user.roles[0].split('_').map(role => `${role.toLocaleLowerCase()} `)} */}
          </p>
        </div>
        <Divider />
        <MenuItem
        // onClick={editProfile}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Edit Profile
        </MenuItem>
        <Divider style={{ margin: "0" }} />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
