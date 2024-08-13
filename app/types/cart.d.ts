import type { IProduct } from "./products";

export interface ICartProduct extends IProduct {
  qty?: number;
}

export interface ICartItem {
  seller_id: number;
  buyer_id: number;
  delivery_status: "placed";
  method: string;
  to_address: string;
  cost_fields: {
    coupon: string;
    price: any;
    quantity: any;
    discount: number;
  };
}
