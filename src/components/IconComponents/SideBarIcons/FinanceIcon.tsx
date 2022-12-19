import { ISideBarIconProps } from "./interfaces";
import FinanceIcons from '../../../assets/sidebar-speedometer.png';
import useStyles from "./style";


const FinanceIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={FinanceIcons} height={32} width={32} alt="" />
  ) : (
<img src={FinanceIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default FinanceIcon;
