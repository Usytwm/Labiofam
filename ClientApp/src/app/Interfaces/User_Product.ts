import { Product } from './Product';
import { User } from './User';

export interface User_Product {
  product_ID: string;
  user_ID: string;
  product?: Product;
  user?: User;
}
