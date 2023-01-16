import { ISideBarIconProps } from "./interfaces";
import MapIcons from "../../../assets/live.png";
import useStyles from "./style";

const MapIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={MapIcons} height={32} width={32} alt="" />
  ) : (
    <img
      src={MapIcons}
      height={32}
      width={32}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default MapIcon;
