import { Product } from './Product';
import { TypePrice } from './TypePrice';

export interface TypePriceProduct {
  product_ID?: string;
  typePrice_ID?: string;
  TypePrice: TypePrice;
  Product: Product;
}
