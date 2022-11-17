import { HeadCell } from "components/commonComponent/Table";
import { AppPaths } from "../constants/commonEnums";
import VehicleIcon from "../assets/vehicles.png"
import UserIcon from "../assets/speedometer.png";
import OrganizationIcon from "../assets/destination.png";
import FeatureIcon from "../assets/time.png";

import React from "react";

export const TOKEN = "token";
export const USER_ID = "user_id";

export const ALL_MENU = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
  AppPaths.ORGANIZATIONS,
  AppPaths.DEVICES,
 
];


export const ALL_ROUTES = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
  AppPaths.ORGANIZATIONS,
  AppPaths.DEVICES,
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
      icon: OrganizationIcon ,
      value:"10",

    },
    {
      dataIndex: "total_distance",
      label: "Distance (km)",
      icon: VehicleIcon,
      value:"50",

    },
    {
      dataIndex: "total_duration",
      label: "Duration (hours)",
      icon: FeatureIcon,
      value:"15",
      
    },

    {
      dataIndex: "total_kilometres",
      label: "Incidents / 100 kilometres",
      icon: UserIcon,
      value:"70",
     
    },
  ];

  return data;
}