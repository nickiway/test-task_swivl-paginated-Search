import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserListItem } from "../../../interfaces/user/search-item.interface";

export interface Status {
  hasMore: boolean;
}

interface SearchState {
  expression: string;
  data: UserListItem[];
  hasMore: Status;
}

const initialState: SearchState = {
  expression: "",
  data: [],
  hasMore: { hasMore: true },
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

    setStatus: (state: SearchState, action: PayloadAction<Status>) => {
      state.hasMore = action.payload;
    },

    resetData: (state) => {
      state.data = [];
    },
  },
});

export const { setSearchExpression, setSearchData, resetData, setStatus } =
  searchSlice.actions;
export default searchSlice.reducer;
