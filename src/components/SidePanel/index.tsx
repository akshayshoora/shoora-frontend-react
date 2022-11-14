import {
  Box,
  Chip,
  CircularProgress,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useAppContext } from "ContextAPIs/appContext";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import Span from "components/commonComponent/Span";
import { AppPaths } from "../../constants/commonEnums";
import MenuIcons from "components/IconComponents/SideBarIcons";
import client from "serverCommunication/client";
import useStyle from "./style";
import { useState } from "react";
import BRAND from "BrandingConstants";
import { getFeatures } from "utils/FeatureCheck";

export default function SidePanel() {
  const classes = useStyle();
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [showSupport, handleShowSupport] = useState<boolean>(false);

  

  let selectedView = window.location.pathname;

  function renderMenu() {
    //@ts-ignore
    const menuList: AppPaths[] = getFeatures();


    return menuList.map((menuItem) => {
      const isActive = selectedView.includes(menuItem) ;
      return (
        <Box
          className={classNames(classes.menuItem, {
            [classes.selectedMenuItem]: isActive,
          })}
          onClick={() => changeView(menuItem)}
        >
          <MenuIcons icon={menuItem} isActive={isActive} />
          <Box component={"span"} className={classes.menuLabel}>
            <Span fontType={isActive ? "primary" : "secondary"} size="small">
              {menuItem}
            </Span>
          </Box>
        </Box>
      );
    });
  }

  function changeView(view: AppPaths) {
    navigate(`/${view}`);
  }

  return (
    <Box>
      <Box className={classes.root}>
        <Box component={"span"} className={classes.logo}>
        
        <img src={BRAND.LOGO} alt="shoora"  width={50}/>
        
           
        </Box>
        <Box className={classes.menu}>{renderMenu()}</Box>
      </Box>
      {/* <Box
        className={classes.supportWrapper}
        onClick={() => handleShowSupport(true)}
      >
        <SupportAgentIcon style={{ color: COLORS.SECONDARY_FONT }} />
        <Typography style={{ marginLeft: 8 }}>
          <Span fontType={"secondary"} size="small">
            Need Help?
          </Span>
        </Typography>
      </Box> */}
    
    </Box>
  );
}
