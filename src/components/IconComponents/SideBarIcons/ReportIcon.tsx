import { ISideBarIconProps } from "./interfaces";
import ReportIcons from "../../../assets/users.png";
import useStyles from "./style";

const ReportIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={ReportIcons} height={32} width={32} alt="" />
  ) : (
    <img
      src={ReportIcons}
      height={32}
      width={32}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default ReportIcon;
