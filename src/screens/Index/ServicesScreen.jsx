import Navbar from "../../components/navbar/Navbar";

// css
import "../Index/Index.css";

// image
import about_us_image from "../../assets/demo-images/reading-table.jpg";

// components
import Footer from "../../components/footer/Footer";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import FooterNote from "./FooterNote";

function ServicesScreen() {
  return (
    <section className="main-wrapper">
      <Navbar active_screen="services" />
      <BottomNavbar />

      <header className="about-us-header">
        <div className="header-image">
          <img src={about_us_image} alt="Services" />
        </div>
        <div className="header-text">Services</div>
      </header>

      <section className="services-container">
        <div className="our-services">
          <h2>Our Services</h2>
          <p>
            This platform is a mobile and web-based marketplace application
            designed to facilitate local buying and selling among college
            students. It addresses the challenges of affordability, convenience,
            and trust in campus transactions by providing a simple,
            campus-verified platform for listing, browsing, and completing
            deals. The app emphasizes ease of use, security, and community
            features without the complexity of large e-commerce sites.
          </p>
        </div>

        <div className="features">
          <h2>Features</h2>
          <div className="feature-contents">
            <div className="feature-box box-1">
              <h3>Buying and Selling Made Easy</h3>
              <p>
                At Student E-Commerce Marketplace, buying and selling is
                streamlined for busy college students. Easily list your unused
                items like textbooks or gadgets with quick photo uploads,
                descriptions, and pricing.
              </p>
            </div>

            <div className="feature-box box-2">
              <h3>Community and Engagement Features</h3>
              <p>
                Foster a vibrant campus community with built-in tools for
                interaction and discovery. Our features include real-time in-app
                chat for haggling and questions, instant notifications for new
                listings or messages, user ratings and reviews to ensure trust.
              </p>
            </div>

            <div className="feature-box box-3">
              <h3>Safety and Verification Services</h3>
              <p>
                At Student E-Commerce Marketplace, your safety is our top
                priority. We use school email verification to ensure only
                genuine students join the platform, creating a trusted
                campus-only community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterNote />
      <Footer />
    </section>
  );
}

export default ServicesScreen;
