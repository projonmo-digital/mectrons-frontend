export interface IUser {
  id: number
  name: string
  email: string
  email_verified_at: null | boolean
  created_at: string
  updated_at: string
  mobile: null | string;
  preferred_language: null | string;
  nid: null | string
  approved_at: null | string;
  profile_picture: null | string
  type: string
  business: null | string
}

export interface ILoginResponse {
  status: string
  message: string
  user: IUser
  token: string
}
