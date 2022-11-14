import { useEffect, useState } from "react";
import { Box, Divider, Button } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppPaths } from "../../constants/commonEnums";
import { useNavigate } from "react-router-dom";

import Span from "components/commonComponent/Span";
import {
  getCurrentDate,
  getCurrentTime,
  getCurrentWeekDay,
  getGreeting,
} from "utils/calenderUtils";
import useStyles from "./style";
import { useAppContext } from "ContextAPIs/appContext";
import { Users } from "Models/userModel";
import UserMenu from "./UserMenu";

function Header() {
  const classes = useStyles();
  const { user, setUser } = useAppContext();

  const [ dateTime, setDateTime ] = useState(`${getCurrentTime()}, ${getCurrentWeekDay()}, ${getCurrentDate()}`);
  useEffect(() => {
    setInterval(getCurrentDateTime, 2000);
  });

  function getCurrentDateTime() {
    setDateTime(`${getCurrentTime()}, ${getCurrentWeekDay()}, ${getCurrentDate()}`);
  }

  const navigate = useNavigate();

  return (
    <Box className={classes.root}>
       <Button onClick = {()=>navigate(`/${AppPaths.PARTNER}`)}> Partner </Button> 
      <Box className={classes.userBar}>
        {/* Notifications (will be included later) */}
        {/* <NotificationsIcon className={classes.notificationIcon} />
        <Divider
          orientation="vertical"
          variant="fullWidth"
          className={classes.separator}
        /> */}
         <Box className={classes.greetingView}>
        <Span fontType="secondary" size="large">{`Welcome ${
          user.name ? `, ${user.name}` : ""
        } `}</Span>

        {/* <Span fontType="secondary" size="extra-small">
          {dateTime}
        </Span> */}
      </Box>
        <UserMenu />
      </Box>
    </Box>
  );
}

export default Header;
