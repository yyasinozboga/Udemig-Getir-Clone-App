import { createSlice } from "@reduxjs/toolkit";
import { ProductType } from "../../types";
import { getDetail } from "../actions";

type StateType = {
  isLoading: boolean;
  error: null | string;
  product: ProductType | null;
};

const initialState: StateType = {
  isLoading: false,
  error: null,
  product: null,
};

const getDetailSlice = createSlice({
  name: "getDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDetail.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDetail.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message as string;
    });

    builder.addCase(getDetail.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.product = payload as ProductType;
    });
  },
});

export default getDetailSlice.reducer;
