import { Users } from "Models/userModel";

export type MainAppProps = {
  user: Users;
  setUser: () => void;
};
