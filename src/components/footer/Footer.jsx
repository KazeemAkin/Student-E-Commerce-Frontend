import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/studentmart-logo-white.png";
import {
  ROUTE_ABOUT_US,
  ROUTE_CONTACT,
  ROUTE_HOME,
  ROUTE_PRODUCT_CATEGORIES,
  ROUTE_PRODUCT_LISTINGS,
  ROUTE_SERVICES,
} from "../../config/constants";
import colors from "../../config/colors";

// css
import "./Footer.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";

function Footer() {
  const current_year = new Date().getFullYear();
  return (
    <footer>
      <div className="upper-items">
        <div className="upper-item">
          <img src={logo} alt="logo" />
        </div>
        <div className="upper-item">
          <div className="title">Quick Links</div>
          <ul>
            <li>
              <NavLink
                to={ROUTE_HOME}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTE_ABOUT_US}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <span>About us</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTE_CONTACT}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <span>Contact</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTE_SERVICES}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <span>Services</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="upper-item">
          <div className="title">Sells</div>
          <ul>
            <li>
              <NavLink
                to={ROUTE_PRODUCT_CATEGORIES}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <span>Product Categories</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={ROUTE_PRODUCT_LISTINGS}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <span>Product Listings</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="upper-item">
          <div className="title">Socials</div>
          <div className="socials">
            <div className="social-item">
              <FaFacebook />
            </div>
            <div className="social-item">
              <FaInstagram />
            </div>
            <div className="social-item">X</div>
          </div>
        </div>
      </div>
      <div className="lower-items">
        <span>&copy; Hakeem. All rights reserved {current_year}</span>
      </div>
    </footer>
  );
}

export default Footer;
