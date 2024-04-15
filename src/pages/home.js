import AllMarket from "../components/AllMarket";
import BestMarket from "../components/BestMarket";
import NavBar from "../components/header";
import "../style/home.css";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <div className="market">
        <BestMarket />
        <AllMarket />
      </div>
    </>
  );
}
