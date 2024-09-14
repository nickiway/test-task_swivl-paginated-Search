import { useAppSelector } from "./redux";

import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

import { getPaginatedData } from "../api/users";
import type { UserListItem } from "../interfaces/user/search-item.interface";

// prevent error of api of empty query string
const DEFAULT_SEARCH_TERM = "a";

export default function useSearch() {
  const { expression } = useAppSelector((state) => state.search);
  const debouncedSearchTerm = useDebounce<string>(expression, 700);

  const [data, setData] = useState<UserListItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("/search/users");

  console.log("render");
  const fetchData = useCallback(async () => {
    try {
      console.log(url);
      const {
        data,
        hasMore,
        url: nextUrl,
      } = await getPaginatedData(
        url,
        debouncedSearchTerm.trim() || DEFAULT_SEARCH_TERM
      );

      setUrl(nextUrl);
      setData((prevData) => [...prevData, ...data]);
      setHasMore(hasMore);
    } catch (error) {
      console.error(error);
    }
  }, [debouncedSearchTerm, url]);

  useEffect(() => {
    setUrl("/search/users");
    setData([]);
    fetchData();
  }, [debouncedSearchTerm]);

  return { fetchData, data, hasMore };
}
