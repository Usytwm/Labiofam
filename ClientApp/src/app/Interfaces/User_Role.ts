import { Role } from './Role';
import { User } from './User';

export interface User_Role {
  user_ID: string;
  role_ID: string;
  user?: User;
  role?: Role;
}
