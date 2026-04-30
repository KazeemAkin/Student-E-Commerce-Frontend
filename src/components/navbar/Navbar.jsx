import {
  FaBars,
  FaSearch,
  FaUserAlt,
  FaCartPlus,
  FaTimes,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

// css
import "./Navbar.css";

// images
import appLogo from "../../assets/logo/studentmart-logo-white.png";
import colors from "../../config/colors";
import {
  ROUTE_ABOUT_US,
  ROUTE_CATEGORY_LISTINGS,
  ROUTE_CONTACT,
  ROUTE_HOME,
  ROUTE_ONBOARDING,
  ROUTE_PROFILE,
  ROUTE_SERVICES,
  ROUTE_SIGN_IN,
} from "../../config/constants";
import { useContext, useState } from "react";
import { AuthContext } from "../../screens/Root/ProtectedRoute";
import { empty } from "../../Utilities/utils";

const Navbar = ({ active_screen = "home", include_search = true }) => {
  const { user } = useContext(AuthContext) || {};
  const [isMobileMenuVisibile, setIsMobileMenuVisible] = useState(false);
  const navigate = useNavigate();

  // close search modal
  const closeMobileModal = (event) => {
    event.stopPropagation();
    setIsMobileMenuVisible(false);
  };

  // open search modal
  const openMobileModal = (event) => {
    event.stopPropagation();
    setIsMobileMenuVisible(true);
  };

  const handleNavClick = (event, to) => {
    navigate(to);
    closeMobileModal(event);
  };

  return (
    <nav className="navbar">
      <div className="nav_icon">
        <FaBars
          color={colors.white}
          className="menu_bar"
          onClick={openMobileModal}
        />
        {isMobileMenuVisibile && (
          <div className="mobile-menu-modal">
            <div className="mobile-menu-container">
              <div className="top-wrapper">
                <span>
                  <FaTimes size={18} onClick={closeMobileModal} />
                </span>
              </div>

              <div className="menu-items">
                <span className="mobile-menu-title">Menu</span>
                <ul>
                  <li>
                    <NavLink
                      onClick={(e) => handleNavClick(e, ROUTE_HOME)}
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                      }}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) => handleNavClick(e, ROUTE_ABOUT_US)}
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                      }}
                    >
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) => handleNavClick(e, ROUTE_ABOUT_US)}
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                      }}
                    >
                      Services
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) => handleNavClick(e, ROUTE_CONTACT)}
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>

                <div className="mobile-menu-sub-title">Categories</div>
                <ul className="mobile-menu-sub-content">
                  <li>
                    <NavLink
                      onClick={(e) =>
                        handleNavClick(e, ROUTE_CATEGORY_LISTINGS + "/books")
                      }
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      Books
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) =>
                        handleNavClick(
                          e,
                          ROUTE_CATEGORY_LISTINGS + "/furnitures",
                        )
                      }
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                      }}
                    >
                      Furnitures
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) =>
                        handleNavClick(
                          e,
                          ROUTE_CATEGORY_LISTINGS + "/techwares",
                        )
                      }
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                      }}
                    >
                      Techwares
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) =>
                        handleNavClick(
                          e,
                          ROUTE_CATEGORY_LISTINGS + "/kitchenware",
                        )
                      }
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                      }}
                    >
                      Kitchenware
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) =>
                        handleNavClick(
                          e,
                          ROUTE_CATEGORY_LISTINGS + "/sportswears",
                        )
                      }
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      Sports Wear
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) =>
                        handleNavClick(
                          e,
                          ROUTE_CATEGORY_LISTINGS + "/dinnerwares",
                        )
                      }
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      Dinnerware
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={(e) =>
                        handleNavClick(
                          e,
                          ROUTE_CATEGORY_LISTINGS + "/miscellaneous",
                        )
                      }
                      style={{
                        color: colors.black,
                        textDecoration: "none",
                        fontSize: 14,
                      }}
                    >
                      Miscellaneous
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
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
                <li className="sign-up-li">
                  <a href={ROUTE_ONBOARDING} className="sign-up-btn">
                    Sign up
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar_avatar_box">
              <NavLink
                to={ROUTE_PROFILE}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <FaCartPlus size={23} style={{ cursor: "pointer" }} />
              </NavLink>
              <NavLink
                to={ROUTE_PROFILE}
                style={{ textDecoration: "none", color: colors.white }}
              >
                <FaUserAlt size={23} style={{ cursor: "pointer" }} />
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
