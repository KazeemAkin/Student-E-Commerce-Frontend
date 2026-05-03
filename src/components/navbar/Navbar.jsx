/* eslint-disable react-hooks/exhaustive-deps */
import {
  FaBars,
  FaSearch,
  FaUserAlt,
  FaCartPlus,
  FaTimes,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

// api
import productApi from "../../api/Products";

// css
import "./Navbar.css";

// images
import appLogo from "../../assets/logo/studentmart-logo-white.png";
import colors from "../../config/colors";
import {
  ROUTE_ABOUT_US,
  ROUTE_CART,
  ROUTE_CATEGORY_LISTINGS,
  ROUTE_CONTACT,
  ROUTE_HOME,
  ROUTE_ONBOARDING,
  ROUTE_PROFILE,
  ROUTE_SERVICES,
  ROUTE_SIGN_IN,
} from "../../config/constants";
import { useContext, useEffect, useRef, useState } from "react";
import { empty, prepareResponseData } from "../../Utilities/utils";
import { AuthContext } from "../../hooks/UseAuth";

const Navbar = ({ active_screen = "home", include_search = true, reload_cart_count = 0 }) => {
  const { user } = useContext(AuthContext) || {};
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ numberOfItemsInCart, setNumberOfItemsInCart ] = useState(reload_cart_count);
  const navigate = useNavigate();
  const toastTR = useRef(null);

  useEffect(() => {
    if (user) {
      noOfItemsInCart();
    }
  }, [ user, reload_cart_count ]);

  // alert functions
  const responseDialog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  /**
   * Get number of items in cart
   * @returns 
   */
  const noOfItemsInCart = async () => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await productApi.getNoOfProductsInCart();
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return setNumberOfItemsInCart(0);
      }
      
      const count = response_data?.response?.count ? response_data.response.count : 0;
      setNumberOfItemsInCart(count);
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

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
        {isMobileMenuVisible && (
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
        <NavLink to={ROUTE_HOME}>
          <img className="logo-image" src={appLogo} alt="" />
        </NavLink>

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
              <div className="cart-icon-box">
                <NavLink
                  to={ROUTE_CART}
                  style={{ textDecoration: "none", color: colors.white }}
                >
                    <FaCartPlus size={23} style={{ cursor: "pointer" }} />
                    { numberOfItemsInCart > 0 && <div className="cart-badge">{numberOfItemsInCart}</div> }
                </NavLink>
              </div>
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
