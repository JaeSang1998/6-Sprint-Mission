import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/Home";
import MarketPage from "./pages/MarketPage/Market";
import AdditemsPage from "./pages/AdditemsPage/Additems";
import CommunityPage from "./pages/CommunityPage/Community";
import LoginPage from "./pages/LoginPage/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/items" element={<MarketPage />} />
        <Route path="/additem" element={<AdditemsPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
