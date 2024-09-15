import { useAppDispatch, useAppSelector } from "./redux";

import { useCallback, useEffect, useRef, useState } from "react";
import useDebounce from "./useDebounce";

import { getPaginatedData } from "../api/users";
import {
  setSearchData,
  resetData,
  setStatus,
} from "../lib/redux/slices/searchSlice";

interface UseSearchResult {
  fetch: () => void;
  error: string | null;
}

export default function useSearch(): UseSearchResult {
  const dispatch = useAppDispatch();
  const expression = useAppSelector((state) => state.search.expression);

  const debouncedSearchTerm = useDebounce<string>(expression);

  const BASIC_URL = debouncedSearchTerm.trim() ? "/search/users" : "/users";

  const url = useRef<string>(BASIC_URL);
  const isFirstRender = useRef<boolean>(true);

  const [error, setError] = useState<string | null>("");

  const fetch = useCallback(async () => {
    try {
      const {
        data,
        hasMore,
        url: next,
      } = await getPaginatedData(url.current, debouncedSearchTerm.trim());

      url.current = next;
      dispatch(setSearchData(data));

      dispatch(setStatus({ hasMore }));
    } catch (error) {
      setError("User's loading failed");
      console.error("Fetch error", error);
    }
  }, [debouncedSearchTerm, dispatch]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    url.current = BASIC_URL;
    dispatch(resetData());
    dispatch(setStatus({ hasMore: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, dispatch]);

  return { fetch, error };
}
