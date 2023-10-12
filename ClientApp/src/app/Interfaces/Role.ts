import { User_Role } from './User_Role';

export interface Role {
  role_ID: string;
  name?: string;
  description?: string;
  users?: User_Role[];
}
