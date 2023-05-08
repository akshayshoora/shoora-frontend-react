import { HeadCell } from "components/commonComponent/Table";
import { AppPaths } from "../constants/commonEnums";
import DistanceIcon from "../assets/distance.png";
import Trips from "../assets/trips.png";
import DurationIcon from "../assets/time.png";
import kilometresIcon from "../assets/speedometer.png";
import VehicleIcon from "../assets/vehicle-w.png";


import React from "react";

export const TOKEN = "token";
export const USER_ID = "user_id";
export const USER_NAME = "user_name";

export const IS_SHIPPER = "is_shipper";
export const CAN_POLL_NOTIFICATION = "can_poll_notification";


// Add label here for menu render
export const sideMenuLabel: {
  [key: string]: string;
} = {
  [AppPaths.DASHBOARD]: "Dashboard",
  [AppPaths.USERS]: "Users",
  [AppPaths.ORGANIZATIONS]: "Organizations",
  [AppPaths.DEVICES]: "Devices",
  [AppPaths.DRIVERS]: "Drivers",
  [AppPaths.VEHICLES]: "Vehicles",
  [AppPaths.ALERTS]: "Alerts",
  [AppPaths.LIVE]: "Live View",
  [AppPaths.MAP]: "Map View",
  [AppPaths.TRIP]: "Trip",
  [AppPaths.GEOFENCETRIPS]: "Geofence Trip",
  [AppPaths.LOCKDEVICE]: "Lock Device",
  [AppPaths.REPORT]: "Report",
  [AppPaths.FINANCE]: "finance",
  [AppPaths.FUEL]: "Fuel",
  [AppPaths.TYRE]: "Tyre Claim",
  [AppPaths.TYREPERFORMANCE]: "Tyre Performance",
  [AppPaths.COACHING]: "Coaching",
  [AppPaths.MAINTENANCE]: "Maintenance",
  [AppPaths.JOBCARD]: "Job Card",
  [AppPaths.GEOFENCE]: "Geofence",
  [AppPaths.INSPECTION]: "Inspection"
};

export const ALL_MENU = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
  AppPaths.ORGANIZATIONS,
  AppPaths.DEVICES,
  AppPaths.DRIVERS,
  AppPaths.VEHICLES,
  AppPaths.ALERTS,
  AppPaths.LIVE,
  AppPaths.MAP,
  AppPaths.GEOFENCE,
  AppPaths.TRIP,
  AppPaths.GEOFENCETRIPS,
  AppPaths.LOCKDEVICE,
  AppPaths.REPORT,
  AppPaths.FINANCE,
  AppPaths.FUEL,
  AppPaths.TYRE,
  AppPaths.TYREPERFORMANCE,
  AppPaths.COACHING,
  AppPaths.MAINTENANCE,
  AppPaths.JOBCARD,
  AppPaths.INSPECTION
];

export const ALL_ROUTES = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
  AppPaths.ORGANIZATIONS,
  AppPaths.DEVICES,
  AppPaths.DRIVERS,
  AppPaths.VEHICLES,
  AppPaths.ALERTS,
  AppPaths.LIVE,
  AppPaths.MAP,
  AppPaths.GEOFENCE,
  AppPaths.TRIP,
  AppPaths.GEOFENCETRIPS,
  AppPaths.LOCKDEVICE,
  AppPaths.REPORT,
  AppPaths.FINANCE,
  AppPaths.FUEL,
  AppPaths.TYRE,
  AppPaths.TYREPERFORMANCE,
  AppPaths.COACHING,
  AppPaths.MAINTENANCE,
  AppPaths.JOBCARD,
  AppPaths.INSPECTION
];

type ROLE_BASED_FILTERED_SUMMARY = {
  dataIndex: string;
  label: string;
  icon: string;
  unit?: string;
  extraDataIndex?: string;
  value?: string;
};

export const getRoleBasedFilteredSummary = () => {
  const data: ROLE_BASED_FILTERED_SUMMARY[] = [
    {
      dataIndex: "total_vehicles",
      label: "Total Vehicle",
      icon: VehicleIcon,
      value: "10",
    },
    {
      dataIndex: "total_distance",
      label: "Total Distance",
      icon: DistanceIcon,
      value: "50",
    },
    {
      dataIndex: "average_distance",
      label: "Average Distance",
      icon: DistanceIcon,
      value: "15",
    },
    // {
    //   dataIndex: "total_duration",
    //   label: "Duration",
    //   icon: DurationIcon,
    //   value: "15",
    // },

    {
      dataIndex: "total_incidents",
      label: "Incidents / 100 kilometres",
      icon: kilometresIcon,
      value: "70",
    },
  ];

  return data;
};
