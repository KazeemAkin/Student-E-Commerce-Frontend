/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../../components/navbar/Navbar";
import ProfileHeader from "./ProfileHeader";

// css
import "./Profile.css";
import Listings from "../Index/Listings";
import Ratings from "./Ratings";
import Footer from "../../components/footer/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Root/ProtectedRoute";
import { empty, isObject } from "../../Utilities/utils";
import { useNavigate } from "react-router-dom";
import { ROUTE_HOME } from "../../config/constants";

function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || empty(user) || !isObject(user)) {
      return navigate(ROUTE_HOME);
    }
  }, []);

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
