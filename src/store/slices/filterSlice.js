import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchText: "",
  sortType: "all",
};

export const filterSlice = createSlice({
  name: "todos",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    sortTodo: (state, action) => {
      state.sortType = action.payload;
    },
    searchTodo: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { sortTodo, searchTodo } = filterSlice.actions;

export default filterSlice.reducer;
