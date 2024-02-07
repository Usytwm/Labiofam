import { User_Product } from './User_Product';
import { User_Role } from './User_Role';

export interface User {
  id?: string;
  userName: string;
  passwordHash: string;
  email: string;
  roles: User_Role[];
  products: User_Product[];
  image?: string;
}
