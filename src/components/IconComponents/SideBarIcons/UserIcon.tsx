import { ISideBarIconProps } from "./interfaces";
import UsersIcon from '../../../assets/users.png';
import useStyles from "./style";


const UserIcon = (props: ISideBarIconProps) => {
  const classes = useStyles();
  const { isActive } = props;
  return isActive ? (
    <img src={UsersIcon} height={32} width={32} alt="" />
  ) : (
<img src={UsersIcon} height={32} width={32} className={classes.disabledImage} alt="" />
  );
};
export default UserIcon;
