import { Product } from './Product';
import { TypePrice } from './TypePrice';

export interface ProductData {
  product: Product;
  types: TypePrice[];
}
