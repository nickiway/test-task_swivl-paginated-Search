import { useAppSelector } from "./redux";

import { useCallback, useEffect, useState } from "react";
import useDebounce from "./useDebounce";

import { getUsers } from "../api/users";

import type { UserListItem } from "../interfaces/user/search-item.interface";

// prevent error of api of empty query string
const DEFAULT_SEARCH_TERM = "a";

export default function useSearch() {
  const { expression } = useAppSelector((state) => state.search);
  const debouncedSearchTerm = useDebounce<string>(expression, 700);

  const [data, setData] = useState<UserListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    const response = await getUsers(
      debouncedSearchTerm.trim() || DEFAULT_SEARCH_TERM
    );
    console.log(response.headers.link);
    setData(response.data.items);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        await fetchData();
      } catch (e) {
        console.error(e);
        setError("Data fetching failed");
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedSearchTerm, fetchData]);

  return { data, error, loading };
}
