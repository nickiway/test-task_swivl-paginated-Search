import { ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setSearchExpression } from "../../lib/redux/slices/searchSlice";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon, Clear } from "@mui/icons-material";

export default function Search() {
  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.search.expression);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    dispatch(setSearchExpression(value));
  };

  const onClear = () => {
    dispatch(setSearchExpression(""));
  };

  const showClearIcon: boolean = !!expression.length;

  return (
    <TextField
      className="search-bar"
      variant="outlined"
      fullWidth
      placeholder="Enter user's nickname"
      onChange={onChange}
      value={expression}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),

          endAdornment: (
            <InputAdornment
              position="end"
              sx={{ display: showClearIcon ? "block" : "none" }}
            >
              <IconButton onClick={onClear}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
