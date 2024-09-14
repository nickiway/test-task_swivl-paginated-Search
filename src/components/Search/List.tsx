import { useAppSelector } from "../../hooks/redux";

import { Grid2 as Grid } from "@mui/material";
import Card from "./Card";
import { memo } from "react";

export default memo(function List() {
  const data = useAppSelector((state) => state.search.data);

  return (
    <Grid container spacing={5}>
      {data.map((item, index) => (
        <Grid key={index} size={4}>
          <Card data={item} />
        </Grid>
      ))}
    </Grid>
  );
});
