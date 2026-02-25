import Navbar from "../../components/navbar/Navbar";

// css
import "../Index/Index.css";
import Footer from "../../components/footer/Footer";
import Onboarding from "./Onboarding";

function OnboardingScreen() {
  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />

      <Onboarding />

      <Footer />
    </section>
  );
}

export default OnboardingScreen;
