/* eslint-disable react-hooks/exhaustive-deps */
import SectionHeader from "../../components/header/sectionHeader/SectionHeader";

// image
import { ROUTE_CART, ROUTE_PRODUCT_DETAILS } from "../../config/constants";
import { NavLink } from "react-router-dom";
import colors from "../../config/colors";
import { FaShoppingCart } from "react-icons/fa";

// api
import productApi from "../../api/Products";

// images
import avatar from "../../assets/avatars/avatar.png";
import brokenImage from "../../assets/demo-images/broken-image.png";
import { empty, isArray, prepareResponseData, toNormalCase } from "../../Utilities/utils";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../hooks/UseAuth";

function Listings({ title = "Listings", is_user_list = false, ...other }) {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);

  useEffect(() => {
    if (user) {
      if (is_user_list) {
        getUserProducts();
      }
    };
  }, [user])


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
   * List products handler
   */
  const getUserProducts = async (filter = null) => {
    try {
      if (!isLoading) setIsLoading(true);
      const response = await productApi.getUserProducts({ filter });
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to fetch products!",
        );
      }

      return setProducts(isArray(response_data?.response?.products) ? response_data.response.products : []);
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong while fetching products.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="listings-wrapper">
      <SectionHeader title={title} {...other} />

      <div className="listings-container">
        {isArray(products) &&
          products.map((item) => {
            return (
              <div className="listing-item" key={item?._id}>
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
