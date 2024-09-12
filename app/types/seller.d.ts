import type { IProduct } from "./products";

export interface IUserProfile {
  id: number;
  user_id: number;
  dob: null | string;
  gender: null | string;
  address: null | string;
  quote: null | string;
  about_me: null | string;
  created_at: string;
  updated_at: string;
}

export interface ISellerSetting {
  id: number;
  user_id: number;
  name: string;
  name_bn: null | string;
  logo: string;
  phone: string;
  location: string;
  address: string;
  meta_title: null | string;
  meta_desc: null | string;
  facebook: null | string;
  instragram: null | string;
  twitter: null | string;
  google: null | string;
  youtube: null | string;
  created_at: string;
  updated_at: string;
}

export interface ISellerResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
  mobile: null;
  preferred_language: null;
  nid: string;
  approved_at: string;
  profile_picture: null;
  type: "seller";
  product: IProduct[];
  saler_settings: ISellerSetting;
  profile: IUserProfile;
}
