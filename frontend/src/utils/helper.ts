import { NewProduct, ProductType } from "../types";

export const calculateTotal = (products: NewProduct[]): string => {
  const newProducts = products.map(
    (product: NewProduct): NewProduct => ({
      ...product,
      price: product.price.slice(1).replace(",", "."),
    })
  );

  const total = newProducts
    .reduce(
      (a: number, item: any): number => a + item.amount * Number(item.price),
      0
    )
    .toFixed(2)
    .toString()
    .replace(".", ",");

  return "₺" + total;
};

export const createProduct = (item: ProductType) => {
  const newProduct: NewProduct = {
    id: item.id,
    name: item.name,
    price: item.price,
    discountPrice: item.discountPrice,
    amount: 1,
    info: item.amount,
    image: item.image,
    category: item.category,
    subCategory: item.subCategory,
  };

  return newProduct;
};
