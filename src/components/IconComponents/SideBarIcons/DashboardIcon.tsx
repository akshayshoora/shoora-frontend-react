import { ISideBarIconProps } from "./interfaces";
import DashboardIcons from "../../../assets/dashboard.png";
import useStyles from "./style";
const DashboardIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={DashboardIcons} width={28} alt="" />
  ) : (
    <img
      src={DashboardIcons}
      width={28}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default DashboardIcon;
