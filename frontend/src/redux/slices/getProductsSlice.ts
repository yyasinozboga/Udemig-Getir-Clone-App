import { getProducts } from "./../actions/index";
import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types";

type StateType = {
  isLoading: boolean;
  error: null | string;
  products: ProductType[];
};

const initialState: StateType = {
  isLoading: false,
  error: null,
  products: [],
};

const getProductsSlice = createSlice({
  name: "getProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProducts.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });

    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.products = payload as ProductType[];
    });
  },
});

export default getProductsSlice.reducer;
