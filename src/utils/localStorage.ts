import { TOKEN, USER_ID } from "constants/commonConstants";

export function setUserToken(token: string) {
  localStorage.setItem(TOKEN, token);
}

export function getUserToken(): string {
  return localStorage.getItem(TOKEN) as string;
}

export function setUserId(userId: string) {
  localStorage.setItem(USER_ID, userId);
}

export function getUserID(): string {
  const user_id = localStorage.getItem(USER_ID);
  if (user_id) {
    return user_id;
  }
  setUserToken("");
  return "";
}
