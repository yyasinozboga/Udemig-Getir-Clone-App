export interface ProductType {
  id: string;
  name: string;
  amount: string;
  discountPrice?: string;
  price: string;
  category: string;
  subCategory: string;
  image: string;
  images: string[];
}

export interface NewProduct {
  id: string;
  name: string;
  price: string;
  amount: number;
  info: string;
  discountPrice?: string;
  image: string;
  category: string;
  subCategory: string;
}

export type BagType = {
  bag: {
    isLoading: boolean;
    error: string | null;
    products: NewProduct[];
  };
};

export type ProductsType = {
  products: {
    isLoading: boolean;
    error: string | null;
    products: ProductType[];
  };
};

export type ProductStoreType = {
  product: {
    isLoading: boolean;
    error: string | null;
    product: ProductType | null;
  };
};

export type TabBarIconType = {
  tabBarIcon: {
    tabBarIcon: null | undefined;
  };
};
