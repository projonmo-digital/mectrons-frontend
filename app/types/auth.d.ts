export interface IProfile {
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

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at: null | boolean;
  created_at: string;
  updated_at: string;
  mobile: null | string;
  preferred_language: null;
  nid: null | string;
  approved_at: null | string;
  following_count: number;
  followers_count: number;
  profile_picture: string;
  type: "buyer" | "seller" | "admin";
  profile: IProfile;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: null | boolean;
  created_at: string;
  updated_at: string;
  mobile: null | string;
  preferred_language: null | string;
  nid: null | string;
  approved_at: null | string;
  profile_picture: null | string;
  type: string;
  business: null | string;
  profile: IProfile;
}

export interface ILoginResponse {
  status: string;
  message: string;
  user: IUser;
  token: string;
}


