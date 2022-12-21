import { ISideBarIconProps } from "./interfaces";
import CoachingIcons from '../../../assets/coaching.png';
import useStyles from "./style";


const CoachingIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={CoachingIcons} height={32} width={32} alt="" />
  ) : (
<img src={CoachingIcons} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default CoachingIcon;
