import { Category } from './category.model';

export interface Product {
  id: number;
  userId: number;
  name: string;
  price: number;
  discountPrice: number | null;
  isDiscounted: boolean;
  actualPrice: number;
  description: string;
  category: Category;
  rating: number | null;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
