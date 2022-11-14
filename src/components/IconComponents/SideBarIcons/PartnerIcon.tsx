import { ISideBarIconProps } from "./interfaces";
import PartnerIcons from '../../../assets/vehicles.png';
import useStyles from "./style";
const PartnerIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={PartnerIcons} width={28} alt="" />
    ) : (
  <img src={PartnerIcons} width={28} className={classes.disabledImage} alt="" />
    );
};
export default PartnerIcon;
