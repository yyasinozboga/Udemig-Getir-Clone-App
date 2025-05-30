import { NewProduct } from "./../../types/index";
import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToBag,
  deleteAllProductsFromBag,
  deleteProductFromBag,
  getProductsFromBag,
} from "../actions";

type StateType = {
  isLoading: boolean;
  error: null | string;
  products: NewProduct[];
};

const initialState: StateType = {
  isLoading: false,
  error: null,
  products: [],
};

const bagSlice = createSlice({
  name: "bagSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsFromBag.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProductsFromBag.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });

    builder.addCase(getProductsFromBag.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.products = payload;
    });

    builder.addCase(addProductToBag.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addProductToBag.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });

    builder.addCase(addProductToBag.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      const foundIndex = state.products.findIndex((i) => i.id === payload.id);
      if (foundIndex === -1) {
        state.products.push(payload);
      } else {
        state.products.splice(foundIndex, 1, payload);
      }
    });

    builder.addCase(deleteProductFromBag.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteProductFromBag.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });

    builder.addCase(deleteProductFromBag.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      if (Array.isArray(payload)) {
        state.products = payload;
      } else {
        const foundIndex = state.products.findIndex((i) => i.id === payload.id);
        state.products.splice(foundIndex, 1, payload);
      }
    });

    builder.addCase(deleteAllProductsFromBag.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(deleteAllProductsFromBag.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });

    builder.addCase(
      deleteAllProductsFromBag.fulfilled,
      (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.products = payload;
      }
    );
  },
});

export default bagSlice.reducer;
