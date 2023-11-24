import { User_Role } from './User_Role';

export interface Role {
  id?: string;
  name?: string;
  description?: string;
  users?: User_Role[];
}
