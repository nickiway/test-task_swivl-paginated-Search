import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  expression: string;
}

const initialState: SearchState = {
  expression: "",
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
  },
});

export const { setSearchExpression } = searchSlice.actions;
export default searchSlice.reducer;
