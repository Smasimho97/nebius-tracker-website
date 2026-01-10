import SiteHeader from "../components/SiteHeader/SiteHeader.jsx";
import Financials from "../components/Financials/Financials.jsx";
import WorldMap from "../components/WorldMap/WorldMap.jsx";
import Redirect from "../components/Redirect/Redirect.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function LandingPage() {
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
