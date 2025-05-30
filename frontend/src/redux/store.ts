import { configureStore } from "@reduxjs/toolkit";
import bagSlice from "./slices/bagSlice";
import getDetailSlice from "./slices/getDetailSlice";
import getProductsSlice from "./slices/getProductsSlice";
import tabBarIconSlice from "./slices/tabBarIconSlice";

const store = configureStore({
  reducer: {
    bag: bagSlice,
    product: getDetailSlice,
    products: getProductsSlice,
    tabBarIcon: tabBarIconSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
