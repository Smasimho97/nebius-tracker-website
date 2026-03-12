import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import DatacenterTimeline from "./pages/DatacenterTimeline.jsx";
import Financials from "./pages/Financials.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/datacenter_timeline" element={<DatacenterTimeline />} />
        <Route path="/financials" element={<Financials />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
