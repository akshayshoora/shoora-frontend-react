import { HeadCell } from "components/commonComponent/Table";
import { AppPaths } from "../constants/commonEnums";
import DistanceIcon from "../assets/distance.png"
import Trips from "../assets/trips.png";
import DurationIcon from "../assets/time.png";
import kilometresIcon from "../assets/speedometer.png";

import React from "react";

export const TOKEN = "token";
export const USER_ID = "user_id";

// Add label here for menu render
export const sideMenuLabel: {
  [key: string]: string;
  } = {
    [AppPaths.DASHBOARD]:"Dashboard",
    [AppPaths.USERS]:"Users",
    [AppPaths.ORGANIZATIONS]:"Organizations",
    [AppPaths.DEVICES]:"Devices",
    [AppPaths.DRIVERS]:"Drivers",
    [AppPaths.VEHICLES]:"Vehicles",
    [AppPaths.ALERTS]:"Alerts",
    [AppPaths.LIVE]:"Live View",
    [AppPaths.MAP]:"Map View",
    [AppPaths.TRIP]:"Trip",
    [AppPaths.REPORT]:"Report",
    [AppPaths.FINANCE]:"finance",
    [AppPaths.FUEL]:"Fuel",
    [AppPaths.TYRE]:"Tyre",
    [AppPaths.COACHING]:"Coaching",
    [AppPaths.MAINTENANCE]:"Maintenance",
    [AppPaths.JOBCARD]:"Job Card"
}

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
  AppPaths.TRIP,
  AppPaths.REPORT,
  AppPaths.FINANCE,
  AppPaths.FUEL,
  AppPaths.TYRE,
  AppPaths.COACHING,
  AppPaths.MAINTENANCE,
  AppPaths.JOBCARD
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
  AppPaths.TRIP,
  AppPaths.REPORT,
  AppPaths.FINANCE,
  AppPaths.FUEL,
  AppPaths.TYRE,
  AppPaths.COACHING,
  AppPaths.MAINTENANCE,
  AppPaths.JOBCARD
];



type ROLE_BASED_FILTERED_SUMMARY = {
    dataIndex: string;
    label: string;
    icon: string;
    unit?: string;
    extraDataIndex?: string;
    value?:string;
};

export const getRoleBasedFilteredSummary = () => {

  const data : ROLE_BASED_FILTERED_SUMMARY[] = [
    {
      dataIndex: "total_trips",
      label: "Trips",
      icon: Trips ,
      value:"10",

    },
    {
      dataIndex: "total_distance",
      label: "Distance (km)",
      icon: DistanceIcon,
      value:"50",

    },
    {
      dataIndex: "total_duration",
      label: "Duration (hours)",
      icon: DurationIcon,
      value:"15",
      
    },

    {
      dataIndex: "total_kilometres",
      label: "Incidents / 100 kilometres",
      icon: kilometresIcon,
      value:"70",
     
    },
  ];

  return data;
}