import { useAppDispatch, useAppSelector } from "./redux";

import { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";

import { getPaginatedData } from "../api/users";
import { setSearchData, resetData } from "../lib/redux/slices/searchSlice";

interface Status {
  hasMore: boolean;
}

// prevent error from api of empty query string
const DEFAULT_SEARCH_TERM = "a";
const BASIC_URL = "/search/users";

export default function useSearch() {
  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.search.expression);

  const url = useRef<string>(BASIC_URL);

  const debouncedSearchTerm = useDebounce<string>(expression);
  const [status, setStatus] = useState<Status>({
    hasMore: true,
  });
  const [error, setError] = useState<string | null>("");

  const fetch = useCallback(async () => {
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
      dispatch(setSearchData(data));
      setStatus({ hasMore });
    } catch (error) {
      setError("User's loading failed");
      console.error("Fetch error", error);
    }
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    url.current = BASIC_URL;
    dispatch(resetData());
    setStatus({ hasMore: true });
  }, [debouncedSearchTerm, dispatch]);

  return { fetch, status, error };
}
