import type { IOffer } from "./offer"

export interface IFlashSale {
  id: number
  flash_sale_id: number
  attach_id: number
  offer: IOffer
  attach_type: string
  created_at: string
  updated_at: string
}

export interface ICategory {
  id: number
  name: string
  slug: string
  commission: number
  order: number
  flash_sale_offers: IFlashSale[]
  image: null | string
  desc: null | string
  parent_id: null | number
  children: ICategory []
}