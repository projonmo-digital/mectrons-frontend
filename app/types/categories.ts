export interface ICategory {
  id: number
  name: string
  slug: string
  commission: number
  order: number
  image: null | string
  desc: null | string
  parent_id: null | number
  children: ICategory []
}