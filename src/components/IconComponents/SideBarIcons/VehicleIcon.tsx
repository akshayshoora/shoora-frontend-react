import { ISideBarIconProps } from "./interfaces";
import VehicleIcons from "../../../assets/vehicle.png";
import useStyles from "./style";

const VehicleIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={VehicleIcons} height={32} width={32} alt="" />
  ) : (
    <img
      src={VehicleIcons}
      height={32}
      width={32}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default VehicleIcon;
