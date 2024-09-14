import { useAppDispatch, useAppSelector } from "./redux";

import { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";

import { getPaginatedData } from "../api/users";
import { setSearchData, resetData } from "../lib/redux/slices/searchSlice";

// prevent error from api of empty query string
const DEFAULT_SEARCH_TERM = "a";

const BASIC_URL = "/search/users";

export default function useSearch() {
  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.search.expression);

  const url = useRef<string>(BASIC_URL);
  const debouncedSearchTerm = useDebounce<string>(expression, 700);
  const [status, setStatus] = useState<Record<string, boolean>>({
    hasMore: true,
  });

  console.log("render use search");
  const fetchData = useCallback(async () => {
    try {
      const {
        data,
        hasMore,
        url: next,
      } = await getPaginatedData(
        url.current,
        debouncedSearchTerm.trim() || DEFAULT_SEARCH_TERM
      );

      url.current = next;

      console.log(next);
      dispatch(setSearchData(data));
      setStatus({ hasMore });
    } catch (error) {
      console.error(error);
    }
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    url.current = BASIC_URL;
    dispatch(resetData());
    setStatus({ hasMore: true });
  }, [debouncedSearchTerm, dispatch]);

  return { fetchData, status };
}
