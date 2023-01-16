import { ISideBarIconProps } from "./interfaces";
import DriverIcons from "../../../assets/sidebar-speedometer.png";
import useStyles from "./style";

const DriverIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={DriverIcons} height={32} width={32} alt="" />
  ) : (
    <img
      src={DriverIcons}
      height={32}
      width={32}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default DriverIcon;
