/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";

// css
import "./Checkout.css";

// api
import productApi from "../../api/Products";
import paymentApi from "../../api/Payment";

// image 
import default_image from "../../assets/broken-image.png";

// components
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import { useContext, useEffect, useRef, useState } from "react";
import { empty, isObject, prepareResponseData } from "../../Utilities/utils";

import FullPageLoader from "../../components/loader/FullPageLoader";
import { Toast } from "primereact/toast";
// import { useUserGuard } from "../../hooks/UserGuard";
import colors from "../../config/colors";
import { AuthContext } from "../../hooks/UseAuth";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./StripeForm";
import { loadStripe } from '@stripe/stripe-js';
import { ROUTE_TRANSACTION_HISTORY } from "../../config/constants";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
function CheckoutScreen() {
  // useUserGuard();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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
      
      responseDialog(
        'success',
        'Operation Successful',
        `Payment successful.`
      )

      navigate(ROUTE_TRANSACTION_HISTORY);
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };


  const payForProduct = async (stripe_token) => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await paymentApi.payForProduct({ product_id, stripe_token });
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to pay for product!",
        );
      }
      
      const details = isObject(response_data?.response) ? response_data.response : {};
      setProductDetails(details);
    } catch (error) {
      console.log({error});
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
            <Elements stripe={stripePromise}>
              <StripeForm
                onSuccess={(data) => {
                  setIsLoading(false);
                  payForProduct(data?.id);
                }}
                onError={(msg) => {
                  setIsLoading(false);
                  responseDialog("error", "Payment Error", "Failed to make payment.");
                }}
                isStripeLoading={() => setIsLoading(true)}
              />
            </Elements>
          </div>
        </div>

        {/* <div className="rating-container">
        </div> */}
      </div> 
      
      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="bottom-left" />
    </section>
  );
}

export default CheckoutScreen;
