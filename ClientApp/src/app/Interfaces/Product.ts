import { Product_POS } from './Product_POS';
import { User_Product } from './User_Product';

export interface Product {
  Id: string;
  name?: string;
  image?: string;
  type?: string;
  summary?: string;
  specifications?: string;
  points_Of_Sales?: Product_POS[];
  users?: User_Product[];
}
