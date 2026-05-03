/* eslint-disable react-hooks/exhaustive-deps */
import SectionHeader from "../../components/header/sectionHeader/SectionHeader";

// image
import { ROUTE_CART, ROUTE_PRODUCT_DETAILS } from "../../config/constants";
import { NavLink } from "react-router-dom";
import colors from "../../config/colors";
import { FaShoppingCart } from "react-icons/fa";

// api

// images
import avatar from "../../assets/avatars/avatar.png";
import brokenImage from "../../assets/demo-images/broken-image.png";
import { isArray, toNormalCase } from "../../Utilities/utils";
import { useContext } from "react";
import { AuthContext } from "../../hooks/UseAuth";

function Listings({ data, title = "Listings", is_user_list = false, ...other }) {
  const { user } = useContext(AuthContext);

  return (
    <section className="listings-wrapper">
      <SectionHeader title={title} {...other} />

      <div className="listings-container">
        {isArray(data) &&
          data.map((item) => {
            return (
              <div className="listing-item" key={item?._id} onClick={() => ROUTE_PRODUCT_DETAILS + `/${item?._id}`}>
                <NavLink
                  to={ROUTE_PRODUCT_DETAILS + `/${item?._id}`}
                  style={{ textDecoration: "none", color: colors.black }}
                >
                  <div className="header-image">
                    {item?.product_image ? (
                      <img src={item.product_image} alt="Product" />
                    ) : (
                      <img src={brokenImage} alt="broken" />
                    )}
                  </div>
                  <div className="top">
                    <div className="title">{item?.name || "N/A"}</div>
                    <div className="price">
                      &pound;{item?.price?.toFixed(2) || "0.00"}
                    </div>
                  </div>
                </NavLink>
                <div className="bottom-box">
                  <div className="avatar-box">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" />
                    ) : (
                      <img src={avatar} alt="Avatar" />
                    )}
                  </div>
                  <div className="name-box">
                    <span className="name">
                      {`${toNormalCase(user?.username) || "N/A"}`}
                    </span>
                    <span className="cart">
                      <NavLink
                        to={ROUTE_CART}
                        style={{
                          textDecoration: "none",
                          color: colors.primary,
                        }}
                        className="cart-icon"
                      >
                        <FaShoppingCart color={colors.primary} />
                      </NavLink>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}

export default Listings;
