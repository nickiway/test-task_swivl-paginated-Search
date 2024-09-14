import { CircularProgress, Container } from "@mui/material";

export const Loader = () => {
  return (
    <Container className="centered">
      <CircularProgress key={0} size={100} />
    </Container>
  );
};
