import { ISideBarIconProps } from "./interfaces";
import MaintenanceIcons from '../../../assets/sidebar-speedometer.png';
import useStyles from "./style";


const MaintenanceIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={MaintenanceIcons} height={32} width={32} alt="" />
  ) : (
<img src={MaintenanceIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default MaintenanceIcon;
