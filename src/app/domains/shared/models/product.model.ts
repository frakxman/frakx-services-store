import { Category } from "./category.model";

export interface Product {
  id:         string;
  name:        string;
  price:       number;
  description: string;
  quantity:    number;
  stock:       number;
  images:      string[];
}




