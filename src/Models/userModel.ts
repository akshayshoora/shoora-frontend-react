import { Roles } from "constants/commonTypes";

export class Users {
  id: string = '';
  name: string = '';
  email: string = '';
  contact_number: number = 0;
  contact_code: number = 0;
  address: string = '';
  roles: Roles[] = [];
  organization_id: string = "";
  is_active:boolean=false
}

// class UserRoles {
//   id: string = '';
//   name: string = '';
// }