import { createSlice } from "@reduxjs/toolkit";

type StateType = {
  tabBarIcon: null | true;
};

const initialState: StateType = { tabBarIcon: true };

const tabBarIconSlice = createSlice({
  name: "tabBarIcon",
  initialState,
  reducers: {
    setTabBarIcon(state, { payload }) {
      state.tabBarIcon = payload;
    },
  },
});

export const { setTabBarIcon } = tabBarIconSlice.actions;
export default tabBarIconSlice.reducer;
