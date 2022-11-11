import { AppPaths } from '../constants/commonEnums';
import {
  HOST_ADMIN,
  HOST_MENU,
  HOST_SUB_ADMIN,
  SUB_HOST_MENU,
  SUPER_ADMIN,
  SUPER_ADMIN_MENU,
  FLEET_MANAGER,
  FLEET_MANAGER_MENU,
  CLIENT_ADMIN,
  CLIENT_MENU,
  SUPER_ADMIN_ROUTES,
  HOST_ROUTES,
  SUB_HOST_ROUTES,
  FLEET_MANAGER_ROUTES,
  CLIENT_ROUTES,
} from 'constants/commonConstants';
import { Roles } from 'constants/commonTypes';

export function getMenu(role: Roles): AppPaths[] {
  if (role === HOST_ADMIN) {
    return HOST_MENU;
  }
  if (role === HOST_SUB_ADMIN) {
    return SUB_HOST_MENU;
  }
  if (role === FLEET_MANAGER) {
    return FLEET_MANAGER_MENU;
  }
  if (role === CLIENT_ADMIN) {
    return CLIENT_MENU;
  }
  return SUPER_ADMIN_MENU;
}

export function getRoutes(role: Roles): AppPaths[] {
  if (role === HOST_ADMIN) {
    return HOST_ROUTES;
  }
  if (role === HOST_SUB_ADMIN) {
    return SUB_HOST_ROUTES;
  }
  if (role === FLEET_MANAGER) {
    return FLEET_MANAGER_ROUTES;
  }
  if (role === CLIENT_ADMIN) {
    return CLIENT_ROUTES;
  }
  return SUPER_ADMIN_ROUTES;
}

export function checkRouteAsPerRole(role: Roles, route: AppPaths): boolean {
  if (!role) {
    return false;
  }
  if (role === 'SUPER_ADMIN') {
    return true;
  }
  const routes = getRoutes(role);

  return routes.includes(route);
}

export function isSuperAdmin(roles: Roles[]): boolean {
  return roles[0] === SUPER_ADMIN;
}

export function isClientAdmin(roles: Roles[]): boolean {
  return roles[0] === CLIENT_ADMIN;
}

export function isHostAdmin(roles: Roles[]): boolean {
  return roles[0] === HOST_ADMIN;
}

export function isSubHostAdmin(roles: Roles[]): boolean {
  return roles[0] === HOST_SUB_ADMIN;
}

export function isFleetManager(roles: Roles[]): boolean {
  return roles[0] === FLEET_MANAGER;
}

export function getPriorityRole(roles: Roles[]) {
  // superAdmin -> clientAdmin -> hostAdmin -> hostSubAdmin -> fleetManager -> endUser
  if(roles.includes("SUPER_ADMIN"))
    return "SUPER_ADMIN";
  if(roles.includes("CLIENT_ADMIN"))
    return "CLIENT_ADMIN";
  if(roles.includes("HOST_ADMIN"))
    return "HOST_ADMIN";
  if(roles.includes("HOST_SUB_ADMIN"))
    return "HOST_SUB_ADMIN";
  if(roles.includes("FLEET_MANAGER"))
    return "FLEET_MANAGER";
  return roles[0];
}
