import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import UserPage from "./pages/DetailsPage";
import UserSearch from "./pages/SearchPage";
import NotFound from "./pages/404";

import "./global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/:id" element={<UserPage />}></Route>
        <Route index element={<UserSearch />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
