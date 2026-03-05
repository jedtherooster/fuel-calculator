import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TravelCosts from "./pages/TravelCosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/travel-costs" element={<TravelCosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
