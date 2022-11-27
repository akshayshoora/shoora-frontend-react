import { ISideBarIconProps } from "./interfaces";
import AlertIcon from '../../../assets/users.png';
import useStyles from "./style";


const AlertsIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={AlertIcon} height={32} width={32} alt="" />
  ) : (
<img src={AlertIcon} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default AlertsIcon;
