import { AppPaths } from "../../../constants/commonEnums";
import DashboardIcon from "./DashboardIcon";
import { ISideBarIconProps } from "./interfaces";
import UsersIcon from "./UsersIcon";

interface IMenuProps extends ISideBarIconProps {
  icon: AppPaths;
}

export default function MenuIcons(props: IMenuProps) {
  const { isActive } = props;
  switch (props.icon) {
   
    case AppPaths.USERS:
      return <UsersIcon isActive={isActive} />;
    case AppPaths.USERS:
      return <DashboardIcon isActive={isActive} />;
    case AppPaths.DASHBOARD:
    default:
      return <DashboardIcon isActive={isActive} />;
  }
}
