import type { ICategory } from "./categories";
import type { IOffer } from "./offer";
import type { IUser } from "./auth";

interface IProductUser {
  id: number;
  name: string;
  profile_picture: string;
  type: string;
}

export interface ICurrency {
  id: number;
  symbol: string;
  name: string;
  code: string;
  usd_exchange_rate: null | number;
}

export interface IField {
  id: nnumber;
  name: string;
  lang: string;
  product_id: number;
  category_id: number;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface IMarker {
  id: number;
  name: string;
  product_id: number;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  user_id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  stock_amount: number;
  currency_id: number;
  category_id: number;
  type_id: number;
  status: "pending" | "ok";
  approved_at: string;
  picture: string[];
  marker: IMarker[];
  discount?: number
  reviews: {
    average_rating: number;
    total_reviews: number;
    product_id: number;
  }[];
  category: ICategory;
  currency: ICurrency;
  user: IProductUser;
  flash_sale_offers: IOffer[];
  is_bookmarked: 0 | 1;
  created_at: string;
  updated_at: string;
}

export interface IReview {
  id: number;
  user_id: number;
  product_id: number;
  product_owner_id: number;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  user: IUser;
}
export interface IReviewWithProduct extends IReview {
  product: IProduct;
}
