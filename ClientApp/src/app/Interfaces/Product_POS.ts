import { Point_of_Sales } from './Point_of_sales';
import { Product } from './Product';

export interface Product_POS {
  product_ID: string;
  point_ID: string;
  point_Of_Sales?: Point_of_Sales;
  product?: Product;
  cantidad: number;
}
