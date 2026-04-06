import Navbar from "../../components/navbar/Navbar";

// css
import "../Index/Index.css";

// image
import about_us_image from "../../assets/demo-images/reading-table.jpg";
import about_us_image_2 from "../../assets/demo-images/about-us.jpg";
import about_us_image_3 from "../../assets/demo-images/mattress.jpg";

// components
import Footer from "../../components/footer/Footer";
import BottomNavbar from "../../components/navbar/BottomNavbar";
import FooterNote from "./FooterNote";

function AboutUsScreen() {
  return (
    <section className="main-wrapper">
      <Navbar active_screen="about_us" />
      <BottomNavbar />

      <header className="about-us-header">
        <div className="header-image">
          <img src={about_us_image} alt="About Us" />
        </div>
        <div className="header-text">About Us</div>
      </header>

      <section className="about-us-container">
        <div className="top-content">
          <div className="image-box">
            <img src={about_us_image_2} alt="About Us" />
          </div>
          <div className="text-body">
            <div className="top-text">About Student E-commerce</div>
            <h1>Buy and Sell in Campus</h1>
            <p>
              Find fairly used items from fellow student, or sell what you no
              longer need, all within your school community.
            </p>
          </div>
        </div>

        <div className="bottom-content">
          <div className="text-boxes">
            <div className="text-body">
              <div className="top-text">Our Mission</div>
              <p>
                Our mission is to empower college students by creating a simple,
                secure, and campus-focused e-commerce platform that enables
                effortless buying, selling, and trading of items, helping them
                save money, reduce waste, and foster a vibrant community of
                mutual support.
              </p>
            </div>
            <div className="text-body">
              <div className="top-text">Our Vision</div>
              <p>
                Our vision is to transform campus life globally by building the
                ultimate student-centric marketplace, where affordability meets
                sustainability, and every student can thrive in a connected,
                resource-sharing ecosystem that extends beyond borders and
                builds lasting networks.
              </p>
            </div>
          </div>

          <div className="image-box">
            <img src={about_us_image_3} alt="About Us" />
            <div className="text-box">
              Every item comes from verified students, so you get honest prices,
              safe transactions, and zero guesswork.
            </div>
          </div>
        </div>
      </section>

      <FooterNote />
      <Footer />
    </section>
  );
}

export default AboutUsScreen;
