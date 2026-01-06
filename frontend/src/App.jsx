//import { useState } from 'react'
import SiteHeader from "./components/SiteHeader/SiteHeader.jsx";
import Financials from "./components/Financials/Financials.jsx";
import WorldMap from "./components/WorldMap/WorldMap.jsx";
import Redirect from "./components/Redirect/Redirect.jsx";
import Footer from "./components/Footer/Footer.jsx";

import "./App.css";

function App() {
  return (
    <>
      <SiteHeader />
      <WorldMap />
      <Financials />
      <Redirect />
      <Footer />
    </>
  );
}

export default App;
