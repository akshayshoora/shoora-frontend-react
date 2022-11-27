import { ISideBarIconProps } from "./interfaces";
import LiveIcons from '../../../assets/live.png';
import useStyles from "./style";


const LiveIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={LiveIcons} height={32} width={32} alt="" />
  ) : (
<img src={LiveIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default LiveIcon;
