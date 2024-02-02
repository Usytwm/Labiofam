import { Product_POS } from './Product_POS';
import { User_Product } from './User_Product';

export interface Product {
  id?: string;
  name?: string;
  image?: string;
  description?: string;
  type_of_Product?: string;
  advantages?: string;
  summary?: Record<string, string>;

  diseases?: string;





  type?: string;
  specifications?: string;
}
