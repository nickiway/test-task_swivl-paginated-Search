import InfiniteScroll from "react-infinite-scroller";

import { useAppSelector } from "../hooks/redux";

import useSearch from "../hooks/useSearch";

import { Container, Typography } from "@mui/material";
import { Loader } from "../components/shared/Loader";

import Search from "../components/Search/Search";
import List from "../components/Search/List";

export default function SearchPage() {
  const { fetch, error } = useSearch();
  const status = useAppSelector((state) => state.search.hasMore);

  const renderLoading = () => {
    if (error)
      return (
        <Typography color="error" variant="h6" align="center">
          {error}
        </Typography>
      );

    return <Loader key={0} />;
  };

  return (
    <Container>
      <Search />

      <InfiniteScroll
        useWindow
        pageStart={0}
        loadMore={fetch}
        hasMore={status.hasMore}
        loader={renderLoading()}
      >
        <List />
      </InfiniteScroll>
    </Container>
  );
}
