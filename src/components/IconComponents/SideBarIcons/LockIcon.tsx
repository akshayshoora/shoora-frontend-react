import { ISideBarIconProps } from "./interfaces";
import LockIcons from "../../../assets/lock.png";
import useStyles from "./style";

const LockIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={LockIcons} height={24} width={24} alt="" />
  ) : (
    <img
      src={LockIcons}
      height={24}
      width={24}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default LockIcon;
