import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSearchExpression } from "../../lib/redux/slices/searchSlice";

import { ChangeEvent } from "react";

import { InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

export default function Search() {
  const dispatch = useAppDispatch();
  const { expression } = useAppSelector((state) => state.search);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSearchExpression(value));
  };

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Enter user's nickname"
      sx={{ bgcolor: "white" }}
      onChange={onChange}
      value={expression}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
