import type { IProduct } from "~/types/products"

export const idGen = () => {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const saveToLocalstorage = <T>(key: string, data: T[]) => {
  return new Promise((resolve) => {
    localStorage.setItem(key, JSON.stringify(data))
    return resolve(true)
  })
}

const retriveFromLocalstorage = <T>(key: string) => {
  return new Promise<T[]>((resolve, reject) => {
    let data: string | null = localStorage.getItem(key)
    if (data) {
      return resolve(JSON.parse(data) as T[])
    }
    return(reject('data not found'))
  })
}

// carts
export const SAVE_CARTS = (formData: IProduct[]) => {
  return retriveFromLocalstorage<IProduct>('carts').then(async (data) => {
    return saveToLocalstorage<IProduct>('carts', [...data, ...formData])
  })
}

export const UPDATE_CART = (formData: IProduct) => {
  return retriveFromLocalstorage<IProduct>('carts').then(async (data) => {
    let product = data.find((p: IProduct) => p.id === formData.id)
    if(product){
      Object.assign(product, { ...formData })
    }
    return saveToLocalstorage('carts', data)
  })
}

export const DELETE_CART = (id: number) => {
  return retriveFromLocalstorage<IProduct>('carts').then(async (data) => {
    return saveToLocalstorage('carts', data.filter((p) => p.id !== id))
  })
}

export const GET_PRODUCTS = () => {
  return retriveFromLocalstorage<IProduct>('carts')
}
