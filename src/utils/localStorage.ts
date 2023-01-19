import { TOKEN, USER_ID, IS_SHIPPER } from "constants/commonConstants";

export function setUserToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function getUserToken(): string {
  return localStorage.getItem(TOKEN) as string;
}

export function setUserId(userId: string) {
  localStorage.setItem(USER_ID, userId);
}

export function setIsShipper(userId: string): any {
  localStorage.setItem(IS_SHIPPER, userId);
}

export function getIsShipper(): string {
  const isShipper = localStorage.getItem(IS_SHIPPER);
  return isShipper || "false";
}


export function getUserID(): string {
  const user_id = localStorage.getItem(USER_ID);
  if (user_id) {
    return user_id;
  }
  setUserToken("");
  return "";
}
