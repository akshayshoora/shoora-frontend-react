import { ISideBarIconProps } from "./interfaces";
import TyreIcons from '../../../assets/sidebar-speedometer.png';
import useStyles from "./style";


const TyreIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={TyreIcons} height={32} width={32} alt="" />
  ) : (
<img src={TyreIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default TyreIcon;
