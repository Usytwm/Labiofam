import { Product_POS } from "./Product_POS";

export interface Point_of_Sales {
  point_ID?: string;
  name?: string;
  image?: string;
  address?: string;
  municipality?: string;
  province?: string;
  latitude: number;
  longitude: number;
  available_Products?: Product_POS[];
}
