import { ISideBarIconProps } from "./interfaces";
import DashboardIcons from '../../../assets/dashboard.png';
import useStyles from "./style";
const DashboardIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={DashboardIcons} height={32} width={32} alt="" />
    ) : (
  <img src={DashboardIcons} height={32} width={32} className={classes.disabledImage} alt="" />
    );
};
export default DashboardIcon;
