export interface IOffer {
  id: number;
  user_id: number;
  name: string;
  from: string;
  to: string;
  desc: null | string;
  image: null | string;
  amount: bumber;
  unit: string;
  created_at: string;
  updated_at: string;
}
