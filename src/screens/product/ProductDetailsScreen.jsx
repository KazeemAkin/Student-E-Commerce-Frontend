/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";

// css
import "./Product.css";

// api
import productApi from "../../api/Products";

// image 
import default_image from "../../assets/broken-image.png";

// components
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useEffect, useRef, useState } from "react";
import { empty, isObject, prepareResponseData } from "../../Utilities/utils";

import FullPageLoader from "../../components/loader/FullPageLoader";
import { Toast } from "primereact/toast";
import { useUserGuard } from "../../hooks/UserGuard";
import colors from "../../config/colors";
import { AuthContext } from "../../hooks/UseAuth";
import { FaCartPlus, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { MdChat } from "react-icons/md";
import Ratings from "../profile/Ratings";
import { ROUTE_SIGN_IN } from "../../config/constants";

function ProductDetailsScreen() {
  useUserGuard(false);
  const { user } = useContext(AuthContext);
  const { product_id } = useParams() || {};
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);
  const [productDetails, setProductDetails] = useState({});
  const [productInCart, setProductInCart] = useState(false);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    getProductDetails();
  }, []);

  useEffect(() => {
    if (user) {
      isProductInCart();
    }
  }, [user]);

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
   * Get product details
   */
  const getProductDetails = async () => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await productApi.getProductDetails(product_id);
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to fetch product details!",
        );
      }
      
      const details = isObject(response_data?.response?.product_details) ? response_data.response.product_details : {};
      setProductDetails(details);
    } catch (error) {
      setIsLoading(false);
      responseDialog("error", "Error Alert", error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Add Product to Cart
   * @returns 
   */
  const toggleCart = async (remove = false) => {
    try {
      if (!isLoading) setIsLoading(true);
      if (cartUpdated) setCartUpdated(false);
      if (!user) {
        return window.location.href = ROUTE_SIGN_IN;
      }

      let response = await productApi.addToCart({ product_id, remove });
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to add product to cart!",
        );
      }
      
      await isProductInCart();
      setCartUpdated(true);
      return responseDialog(
        'success',
        'Operation Successful',
        `Product ${remove ? 'removed from' : 'added to' } cart successfully.`
      )
    } catch (error) {
      responseDialog("error", "Error Alert", error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Check if product is in cart.
   * @returns 
   */
  const isProductInCart = async () => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await productApi.isProductInCart(product_id);
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return setProductInCart(false);
      }
      
      return setProductInCart(response_data?.response?.is_product_in_cart || false );
    } catch (error) {
      responseDialog("error", "Error Alert", error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main-wrapper">
      <Navbar active_screen="" reload_cart_count={cartUpdated} />
      <div className="page-containers product-details-page">
        <div className="product-details-header">
          <div className="header-image-box">
            {
              productDetails ?
                <img src={productDetails?.product_image} alt="product" /> :
                <img src={default_image} alt='default' />
            }
          </div>

          <div className="header-details-box">
            <div className="title">
              <span className="name">{productDetails?.name || 'N/A'}</span>
              <span className="cost">&pound;{productDetails?.price || 'N/A'}</span>
            </div>
            <div className="details">{productDetails?.description || 'N/A'}</div>
            <div className="price">&pound;{productDetails?.price || 'N/A'}</div>
            <div className="location-rating">
              <div className="location">
                <span className="location">
                  <FaMapMarkerAlt size={20} color={colors.primary} />
                  <span>{productDetails?.user_details?.dorm || 'N/A'}</span>
                </span>
              </div>
              <div className="rating">
                <div className="rating-icon">
                  <FaStar size={20} color={colors.primary} />
                  <div className="rating-text">
                    <span className="number">4.6(17)</span>
                    <span className="label">User Rating</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="payment-method">
              <div className="title">Payment Method</div>
              <div className="types">
                <div className="tags">Pay on Delivery</div>
                <div className="tags">In-app Payment</div>
              </div>
            </div>
            <div className="buttons">
              <div className="btn" style={{ backgroundColor: productInCart ? colors.red : colors.primary }} onClick={() => toggleCart( productInCart ? true : false )}>
                <FaCartPlus />
                <span className="text">{productInCart ? 'Remove from Cart' : 'Add to Cart'}</span>
              </div>
              <div className="btn">
                <MdChat />
                <span className="text">Chat</span>
              </div>
            </div>
          </div>
        </div>


          <div className="rating-container">
            {/* Ratings */}
            <Ratings />
          </div>
      </div>
      
      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="top-right" />
    </section>
  );
}

export default ProductDetailsScreen;
