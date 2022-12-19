import { ISideBarIconProps } from "./interfaces";
import FuelIcons from '../../../assets/sidebar-speedometer.png';
import useStyles from "./style";


const FuelIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={FuelIcons} height={32} width={32} alt="" />
  ) : (
<img src={FuelIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default FuelIcon;
