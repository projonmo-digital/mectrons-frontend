import type { ICategory, IFlashSale } from "~/types/categories";
import type { IProduct } from "~/types/products";

export const getGeneratedID = (row: any) => {
  return (
    new Date(row.created_at)
      .toLocaleString("en-BD", { year: "2-digit", month: "2-digit" })
      .split("/")
      .reverse()
      .join("") + row.id
  );
};

export const getFileUrl = (url: string): string => {
  return (
    useRuntimeConfig().public.imageUrl +
    "/" +
    url.replaceAll("public", "storage")
  );
};

export const getUrl = (data: any) => {
  if (data instanceof File) return URL.createObjectURL(data);
  else return getFileUrl(getFileUrl(data));
};

export const getCategoryIds = (category: ICategory) => {
  const getIds = (array: ICategory[]) =>
    array.flatMap<any>(({ id, children }) => [id, ...getIds(children || [])]);
  return [...new Set(getIds([category, ...(category.children || [])]))];
};

export const discountCalculation = (
  categories: ICategory[],
  products: IProduct[]
): IProduct[] => {
  const productsList: IProduct[] = products;
  let max = 0;
  function maxValue(arr: IFlashSale[]) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].offer.amount > max) {
        max = arr[i].offer.amount;
      }
    }
    return max;
  }
  const targeted = async (obj: ICategory[], amount: number) => {
    for (let j = 0; j < obj.length; j++) {
      amount = Math.max(amount, maxValue(obj[j].flash_sale_offers));
      //check is child
      if (obj[j].children.length > 0) return targeted(obj[j].children, amount);
      //check if product in my list has the category
      for (let i = 0; i < productsList.length; i++) {
        if (productsList[i].category.id === obj[j].id) {
          productsList[i].discount = amount;
          // return
        }
      }
    }
  };
  (async () => {
    await targeted(categories, 0).then((result) => {});
  })();
  return productsList;
};

export const SliderArrayGen = () => {
  let sliderCategories: ICategory[][] = [];
  return (categories: ICategory[]): ICategory[][] => {
    let itemArray: ICategory[] = [];
    for (let item of categories) {
      itemArray.push(item);
      if (itemArray.length > 2) {
        sliderCategories.push(itemArray);
        itemArray = [];
      }
    }
    if (itemArray.length) {
      sliderCategories.push(itemArray);
    }
    return sliderCategories;
  };
};
