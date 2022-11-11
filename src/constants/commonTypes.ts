import { Users } from 'Models/userModel';

export type MainAppProps = {
  user: Users;
  setUser: () => void;
};

export type Roles =
  | 'SUPER_ADMIN'
  | 'HOST_ADMIN'
  | 'HOST_SUB_ADMIN'
  | 'FLEET_MANAGER'
  | 'CLIENT_ADMIN';
