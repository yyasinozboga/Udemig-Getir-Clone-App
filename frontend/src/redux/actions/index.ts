import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { NewProduct, ProductType } from "../../types";

type GetProductsType = {
  category: string | string[];
  subCategory?: string;
};

type ProductOfBagType = {
  product: NewProduct;
  type?: boolean;
};

export const getProducts = createAsyncThunk(
  "getProducts",
  async ({
    category,
    subCategory,
  }: GetProductsType): Promise<ProductType[]> => {
    const params = { category, subCategory };

    const { data } = await api.get("/products", { params });

    return data.products;
  }
);

export const getDetail = createAsyncThunk(
  "getDetail",
  async (id: string): Promise<ProductType | unknown> => {
    try {
      const { data } = await api.get(`/products/${id}`);

      return data.product;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductsFromBag = createAsyncThunk(
  "getProductsFromBag",
  async (): Promise<NewProduct[]> => {
    const { data } = await api.get("/bag");

    return data.products;
  }
);

export const addProductToBag = createAsyncThunk(
  "addProductToBag",
  async ({ product, type }: ProductOfBagType): Promise<NewProduct> => {
    if (product && !type) {
      const { data } = await api.post("/bag", product);
      return data.product;
    } else {
      const { data } = await api.patch(`/bag/${product.id}`, {
        ...product,
        amount: product.amount + 1,
      });

      return data.product;
    }
  }
);

export const deleteProductFromBag = createAsyncThunk(
  "deleteProductFromBag",
  async ({
    product,
    type,
  }: ProductOfBagType): Promise<NewProduct | NewProduct[]> => {
    if (product && !type) {
      const { data } = await api.delete(`/bag/${product.id}`);
      return data.products;
    } else {
      const { data } = await api.patch(`/bag/${product.id}`, {
        ...product,
        amount: product.amount - 1,
      });

      return data.product;
    }
  }
);

export const deleteAllProductsFromBag = createAsyncThunk(
  "deleteAllProductsFromBag",
  async (): Promise<[]> => {
    const { data } = await api.delete("/bag");

    return data.products;
  }
);
