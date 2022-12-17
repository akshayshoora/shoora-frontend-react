import { ISideBarIconProps } from "./interfaces";
import TripIcons from '../../../assets/sidebar-speedometer.png';
import useStyles from "./style";


const TripIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={TripIcons} height={32} width={32} alt="" />
  ) : (
<img src={TripIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default TripIcon;
