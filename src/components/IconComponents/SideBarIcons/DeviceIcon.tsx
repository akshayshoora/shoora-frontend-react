import { ISideBarIconProps } from "./interfaces";
import DeviceIcons from "../../../assets/dashboard.png";
import useStyles from "./style";

const DeviceIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={DeviceIcons} height={32} width={32} alt="" />
  ) : (
    <img
      src={DeviceIcons}
      height={32}
      width={32}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default DeviceIcon;
