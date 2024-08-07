export const idGen = () => {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const saveToLocalstorage = (key: string, data: any) => {
  return new Promise((resolve) => {
    return resolve(localStorage.setItem(key, JSON.stringify(data)))
  })
}

const retriveFromLocalstorage = (key: string) => {
  return new Promise((resolve, reject) => {
    let data = localStorage.getItem(key)
    if (data) {
      return resolve(JSON.parse(data))
    }
    return(reject('data not found'))
  })
}

// carts
export const SAVE_CARTS = (formData: any) => {
  return retriveFromLocalstorage('carts').then(async (data: any) => {
    return saveToLocalstorage('carts', [...data, formData])
  })
}

export const UPDATE_CART = (formData: any) => {
  return retriveFromLocalstorage('carts').then(async (data: any) => {
    Object.assign(data.find((p: any) => p.id === formData.id),
      { ...formData }
    )
    return saveToLocalstorage('carts', data);
  })
}

export const DELETE_CART = (id: any) => {
  return retriveFromLocalstorage('carts').then(async (data: any) => {
    return saveToLocalstorage('carts', data.filter((p: any) => p.id !== id))
  })
}

export const GET_PRODUCTS = () => {
  return retriveFromLocalstorage('carts')
}
