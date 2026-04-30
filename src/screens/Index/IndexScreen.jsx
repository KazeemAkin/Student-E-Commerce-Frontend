import Navbar from "../../components/navbar/Navbar";
import HomeHeader from "./HomeHeader";

// css
import "../Index/Index.css";
import Footer from "../../components/footer/Footer";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import Listings from "./Listings";
import { useUserGuard } from "../../hooks/UserGuard";

function IndexScreen() {
  useUserGuard(false);

  return (
    <section className="main-wrapper">
      <Navbar active_screen="home" />
      <BottomNavbar />

      <HomeHeader />
      {/* products */}
      <Listings />

      {/* books */}
      <Listings title="Books" />

      {/* Furnitures */}
      <Listings title="Furnitures" />

      {/* Techwares */}
      <Listings title="Techwares" />

      {/* Kitchenwares */}
      <Listings title="Kitchenwares" />

      {/* Misc */}
      <Listings title="Misc" />

      <Footer />
    </section>
  );
}

export default IndexScreen;
