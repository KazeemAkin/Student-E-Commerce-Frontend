/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";

// css
import "./Checkout.css";

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

function ProductDetailsScreen() {
  useUserGuard();
  const { user } = useContext(AuthContext);
  const { product_id } = useParams() || {};
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);
  const [productDetails, setProductDetails] = useState({});

  useEffect(() => {
    if (user) {
      getProductDetails();
    };   
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
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />
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
                  <span>{user?.dorm || 'N/A'}</span>
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
              <div className="btn">
                <FaCartPlus />
                <span className="text">Add to Cart</span>
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
      <Toast ref={toastTR} position="bottom-left" />
    </section>
  );
}

export default ProductDetailsScreen;
