import { useState } from "react";
import { FaBars, FaSignOutAlt, FaCogs, FaUser, FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// css
import "./Navbar.css";

// images
import appLogo from "../../assets/logo/studentmart-logo-white.png";
import colors from "../../config/colors";
import Card from "../card/Card";
import {
  ROUTE_ABOUT_US,
  ROUTE_CONTACT,
  ROUTE_HOME,
  ROUTE_ONBOARDING,
  ROUTE_SERVICES,
  ROUTE_SIGN_IN,
} from "../../config/constants";
import { useContext } from "react";
import { AuthContext } from "../../screens/Root/ProtectedRoute";
import { empty } from "../../Utilities/utils";

const Navbar = ({ active_screen = "home", include_search = true }) => {
  const { user } = useContext(AuthContext) || {};
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);

  const openProfileMenu = () => {
    setShowAvatarMenu(!showAvatarMenu);
  };

  return (
    <nav className="navbar">
      <div className="nav_icon">
        <FaBars color={colors.white} className="menu_bar" />
      </div>
      <div className="navbar_left">
        <img className="logo-image" src={appLogo} alt="" />

        {include_search && (
          <div className="search-box">
            <FaSearch size={18} />
            <span>Search Products</span>
          </div>
        )}
      </div>

      <div className="navbar_right">
        <div className="navbar_avatar_container">
          {/* menu items */}
          <ul className="menu-list-items">
            <li className={active_screen === "home" ? "active_link" : ""}>
              <NavLink
                to={ROUTE_HOME}
                style={{ textDecoration: "none", color: colors.white }}
              >
                Home
              </NavLink>
            </li>
            <li className={active_screen === "about_us" ? "active_link" : ""}>
              <NavLink
                to={ROUTE_ABOUT_US}
                style={{ textDecoration: "none", color: colors.white }}
              >
                About Us
              </NavLink>
            </li>
            <li className={active_screen === "services" ? "active_link" : ""}>
              <NavLink
                to={ROUTE_SERVICES}
                style={{ textDecoration: "none", color: colors.white }}
              >
                Services
              </NavLink>
            </li>
            <li className={active_screen === "contact" ? "active_link" : ""}>
              <NavLink
                to={ROUTE_CONTACT}
                style={{ textDecoration: "none", color: colors.white }}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* not logged in section of the nav bar */}
          {!user || empty(user) ? (
            <div className="not-logged-in-right-nav">
              <ul>
                <li>
                  <a href={ROUTE_SIGN_IN}>Login</a>
                </li>
                <li>
                  <a href={ROUTE_ONBOARDING} className="sign-up-btn">
                    Sign up
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div
              className="navbar_avatar_box"
              onClick={() => openProfileMenu()}
            >
              sgfgs gsgfsg <FaUser size={20} />
            </div>
          )}

          <Card
            addStyle={`avatar_dropdown_menu ${
              showAvatarMenu ? "flex" : "hide"
            }`}
          >
            <ul className="avatar_main_menu">
              <li>
                <NavLink
                  to="/profile"
                  style={{ textDecoration: "none", color: colors.primary }}
                >
                  <FaUser
                    style={{ marginRight: 13, color: colors.darkgray }}
                    size={14}
                  />{" "}
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings"
                  style={{ textDecoration: "none", color: colors.primary }}
                >
                  <FaCogs
                    style={{ marginRight: 13, color: colors.darkgray }}
                    size={14}
                  />{" "}
                  Settings
                </NavLink>
              </li>
              <hr />
              <li
                style={{
                  marginTop: 10,
                }}
              >
                <NavLink
                  to="/logout"
                  style={{
                    textDecoration: "none",
                    color: colors.danger,
                  }}
                >
                  <FaSignOutAlt
                    style={{ marginRight: 13, color: colors.darkgray }}
                    size={14}
                  />{" "}
                  Log Out
                </NavLink>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
