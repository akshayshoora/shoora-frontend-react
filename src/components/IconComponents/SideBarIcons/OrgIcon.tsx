import { ISideBarIconProps } from "./interfaces";
import OrgIcons from "../../../assets/organization.png";
import useStyles from "./style";

const OrgIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={OrgIcons} height={32} width={32} alt="" />
  ) : (
    <img
      src={OrgIcons}
      height={32}
      width={32}
      className={classes.disabledImage}
      alt=""
    />
  );
};
export default OrgIcon;
