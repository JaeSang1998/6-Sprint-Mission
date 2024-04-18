import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Market from "./pages/Market/Market";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="free"></Route>
        <Route path="items" element={<Market />}></Route>
        <Route path="additem"></Route>
        <Route path="signin"></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
