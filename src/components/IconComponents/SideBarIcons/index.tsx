import { AppPaths } from "../../../constants/commonEnums";
import DashboardIcon from "./DashboardIcon";
import { ISideBarIconProps } from "./interfaces";
import UserIcon from "./UserIcon";
import OrgIcon from "./OrgIcon";
import DeviceIcon from "./DeviceIcon";
import VehicleIcon from './VehicleIcon';
import DriverIcon from './DriverIcon'
import LiveIcon from './LiveIcon'
import AlertsIcon from "./AlertsIcon";
import MapIcon from "./MapIcon";
import TripIcon from "./TripIcon";
import ReportIcon from "./ReportIcon"

interface IMenuProps extends ISideBarIconProps {
  icon: AppPaths;
}

export default function MenuIcons(props: IMenuProps) {
  const { isActive } = props;
  switch (props.icon) {
   
    case AppPaths.USERS:
      return <UserIcon isActive={isActive} />;
    case AppPaths.DASHBOARD:
      return <DashboardIcon isActive={isActive} />;
    case AppPaths.ORGANIZATIONS:
      return <OrgIcon isActive={isActive} />;
    case AppPaths.DEVICES:
      return <DeviceIcon isActive={isActive} />;
    case AppPaths.VEHICLES:
        return <VehicleIcon isActive={isActive} />;
    case AppPaths.DRIVERS:
        return <DriverIcon isActive={isActive} />;
    case AppPaths.LIVE:
          return <LiveIcon isActive={isActive} />;
    case AppPaths.ALERTS:
          return <AlertsIcon isActive={isActive} />;
    case AppPaths.MAP:
      return <MapIcon isActive={isActive} />; 
    case AppPaths.TRIP:
        return <TripIcon isActive={isActive} />;
    case AppPaths.REPORT:
         return <ReportIcon isActive={isActive} />;      
    default:
      return <DashboardIcon isActive={isActive} />;
  }
}
