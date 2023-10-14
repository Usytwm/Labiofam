import { User_Product } from './User_Product';
import { User_Role } from './User_Role';

export interface User {
  user_ID?: number;
  name: string;
  password: string;
  roles: User_Role[];
  products: User_Product[];
}
