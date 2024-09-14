import InfiniteScroll from "react-infinite-scroller";

import useSearch from "../hooks/useSearch";
import { CircularProgress, Container } from "@mui/material";
import Search from "../components/Search/Search";
import List from "../components/Search/List";

export default function SearchPage() {
  const { fetchData, status } = useSearch();

  console.log("render search page");

  return (
    <Container>
      <Search />
      <InfiniteScroll
        useWindow={true}
        pageStart={0}
        loadMore={fetchData}
        hasMore={status.hasMore}
        loader={<CircularProgress key={0} />}
      >
        <List />
      </InfiniteScroll>
    </Container>
  );
}
