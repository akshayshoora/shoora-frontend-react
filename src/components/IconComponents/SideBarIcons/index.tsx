import { AppPaths } from "../../../constants/commonEnums";
import DashboardIcon from "./DashboardIcon";
import { ISideBarIconProps } from "./interfaces";
import UsersIcon from "./UsersIcon";
import OrgIcon from "./OrgIcon";
import DeviceIcon from "./DeviceIcon";

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
      case AppPaths.DEVICES:
      return <DeviceIcon isActive={isActive} />;
    default:
      return <DashboardIcon isActive={isActive} />;
  }
}
