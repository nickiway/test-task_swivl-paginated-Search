import Search from "../components/Search/Search";
import List from "../components/Search/List";
import { Container } from "@mui/material";

export default function SearchPage() {
  return (
    <Container>
      <Search />
      <List />
    </Container>
  );
}
