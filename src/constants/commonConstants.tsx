import { HeadCell } from "components/commonComponent/Table";
import { AppPaths } from "../constants/commonEnums";
import VehicleIcon from "../assets/vehicles.png"
import UserIcon from "../assets/users.png";
import OrganizationIcon from "../assets/organization.png";
import FeatureIcon from "../assets/features.webp";

import React from "react";

export const TOKEN = "token";
export const USER_ID = "user_id";

export const ALL_MENU = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
  AppPaths.ORGANIZATIONS,
 
];


export const ALL_ROUTES = [
  AppPaths.DASHBOARD,
  AppPaths.USERS,
  AppPaths.ORGANIZATIONS,
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
      dataIndex: "total_organizations",
      label: "Total Organization",
      icon: OrganizationIcon ,
      value:"10",

    },
    {
      dataIndex: "total_vehicles",
      label: "Total Vehicles",
      icon: VehicleIcon,
      value:"50",

    },
    {
      dataIndex: "total_features",
      label: "Total Features",
      icon: FeatureIcon,
      value:"15",
      
    },

    {
      dataIndex: "total_users",
      label: "Total Users",
      icon: UserIcon,
      value:"70",
     
    },
  ];

  return data;
}