
export class Users {
  id: string = '';
  name: string = '';
  email: string = '';
  contact_number: number = 0;
  contact_code: number = 0;
  address: string = '';
  roles: UserRoles[] = [];
  organization_id: string = "";
  is_active:boolean=false;
  allowed_features:Features[]=[]
}

export class UserRoles {
  id: string = '';
  name: string = '';
}

export class Features {
  feature: string = '';
  actions: [] = [];
}
