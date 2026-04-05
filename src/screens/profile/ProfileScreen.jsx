import Navbar from "../../components/navbar/Navbar";
import ProfileHeader from "./ProfileHeader";

// css
import "./Profile.css";
import Listings from "../Index/Listings";
import Ratings from "./Ratings";
import Footer from "../../components/footer/Footer";

function ProfileScreen() {
  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />

      {/* profile header section */}
      <ProfileHeader />

      {/* listings */}
      <Listings title="Listed Items" />

      {/* Ratings */}
      <Ratings />

      {/* footer */}
      <Footer />
    </section>
  );
}

export default ProfileScreen;
