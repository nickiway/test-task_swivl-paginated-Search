import InfiniteScroll from "react-infinite-scroll-component";

import Card from "./Card";
import { CircularProgress, Grid2 as Grid } from "@mui/material";

import { getPaginatedData } from "../../api/users";
import { useEffect, useState } from "react";
import { UserListItem } from "../../interfaces/user/search-item.interface";

export default function List() {
  const [data, setData] = useState<UserListItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("/search/users");

  const fetchData = async () => {
    try {
      const { data, hasMore, url: nextUrl } = await getPaginatedData(url, "a");

      setUrl(nextUrl);
      setData((prevData) => [...prevData, ...data]);
      setHasMore(hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfiniteScroll
      style={{
        height: "100vh",
        overflow: "auto",
      }}
      dataLength={data.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<CircularProgress />}
    >
      <Grid container spacing={5}>
        {data.map((item) => (
          <Grid key={item.id} size={4}>
            <Card data={item} />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
}
