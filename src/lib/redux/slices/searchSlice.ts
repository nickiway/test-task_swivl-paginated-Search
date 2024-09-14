import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserListItem } from "../../../interfaces/user/search-item.interface";

interface SearchState {
  expression: string;
  data: UserListItem[];
}

const initialState: SearchState = {
  expression: "",
  data: [],
};

const searchSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setSearchExpression: (
      state: SearchState,
      action: PayloadAction<string>
    ) => {
      state.expression = action.payload;
    },

    setSearchData: (
      state: SearchState,
      action: PayloadAction<UserListItem[]>
    ) => {
      state.data = [...state.data, ...action.payload];
    },

    resetData: (state) => {
      state.data = [];
    },
  },
});

export const { setSearchExpression, setSearchData, resetData } =
  searchSlice.actions;
export default searchSlice.reducer;
