import InfiniteScroll from "react-infinite-scroller";

import Card from "./Card";
import { CircularProgress, Grid2 as Grid } from "@mui/material";
import useSearch from "../../hooks/useSearch";

export default function List() {
  const { data, fetchData, hasMore } = useSearch();
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchData}
      hasMore={hasMore}
      loader={<CircularProgress />}
    >
      <Grid container spacing={5}>
        {data.map((item, index) => (
          <Grid key={index} size={4}>
            <Card data={item} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}
