import { AppPaths } from "../../../constants/commonEnums";
import DashboardIcon from "./DashboardIcon";
import { ISideBarIconProps } from "./interfaces";
import UsersIcon from "./UsersIcon";
import OrgIcon from "./OrgIcon";

interface IMenuProps extends ISideBarIconProps {
  icon: AppPaths;
}

export default function MenuIcons(props: IMenuProps) {
  const { isActive } = props;
  switch (props.icon) {
   
    case AppPaths.USERS:
      return <UsersIcon isActive={isActive} />;
    case AppPaths.DASHBOARD:
      return <DashboardIcon isActive={isActive} />;
      case AppPaths.ORGANIZATIONS:
      return <OrgIcon isActive={isActive} />;
    default:
      return <DashboardIcon isActive={isActive} />;
  }
}
