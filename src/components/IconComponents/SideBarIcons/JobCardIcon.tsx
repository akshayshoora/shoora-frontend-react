import { ISideBarIconProps } from "./interfaces";
import JobCardIcons from '../../../assets/jobcard.png';
import useStyles from "./style";


const JobCardIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={JobCardIcons} height={32} width={32} alt="" />
  ) : (
<img src={JobCardIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default JobCardIcon;
