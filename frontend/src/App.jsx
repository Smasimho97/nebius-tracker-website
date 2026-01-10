import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import DatacenterPage from "./pages/DatacenterPage.jsx";
import KnowledgePage from "./pages/KnowledgePage.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/datacenter" element={<DatacenterPage />} />
        <Route path="/knowledge" element={<KnowledgePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
