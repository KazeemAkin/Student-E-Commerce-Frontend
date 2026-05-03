/* eslint-disable react-hooks/exhaustive-deps */
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
import { empty, isArray, isObject, prepareResponseData } from "../../Utilities/utils";

import FullPageLoader from "../../components/loader/FullPageLoader";
import { Toast } from "primereact/toast";
import { useUserGuard } from "../../hooks/UserGuard";
import colors from "../../config/colors";
import { AuthContext } from "../../hooks/UseAuth";
import { FaTrash, FaWallet } from "react-icons/fa";
import { MdChat } from "react-icons/md";

function CartScreen() {
  useUserGuard();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);
  const [products, setProducts] = useState([]);
  const [total_amount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (user) {
      getProductsCart();
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
  const getProductsCart = async () => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await productApi.getProductsInCart();
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to fetch products in cart!",
        );
      }
      
      const products = isObject(response_data?.response) ? response_data.response : [];
      setProducts(products?.cart_products || []);
      setTotalAmount(products?.total_amount || 0)
    } catch (error) {
      responseDialog("error", "Error Alert", error?.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />
      <div className="page-containers cart-page">
        <div className="cart-items-box">
          <div className="header">Cart(1)</div>
          <div className="cart-items">
            {
              isArray(products) && products.map(product => 
                <div className="cart-item" key={product?._id}>
                  <div className="top">
                    <div className="left">
                      <div className="img-container">
                        { product?.product_image ? <img src={product?.product_image} alt="" /> : <img src={default_image} alt="" />}
                      </div>
                      <div className="name-box">
                        <div className="name">{ product?.name || 'N/A'}</div>
                        <div className="status" style={{ color: product?.status?.toLowerCase() !== 'listed' ? colors.red : colors.black }}>{ product?.status || 'N/A' }</div>
                      </div>
                    </div>
                    
                    <div className="right">
                      <span className="price">&pound;{ parseFloat(product?.price)?.toFixed(2) || product?.price || 'N/A' }</span>
                    </div>
                  </div>

                  <div className="bottom">
                    <FaTrash color={colors.red} />&nbsp;<span className="label">Remove</span>
                    <div className="action">
                      <div className="checkout">
                        <FaWallet />
                        <span className="label">Checkout</span>
                      </div>
                      <div className="chat">
                        <MdChat />
                        <span className="label">Chat</span>
                      </div>
                    </div>
                  </div>
              </div>
            )}
          </div>
        </div>

        <div className="cart-summary">
          <div className="header">Cart Summary</div>
          <div className="subtotal">
            <span className="title">Subtotal</span>
            <span className="cost">&pound;{ parseFloat(total_amount)?.toFixed(2) || total_amount || 0 }</span>
          </div>

          <div className="bottom">
            <div className="checkout-button">
              <span className="title">Checkout</span>
              <span className="cost">&pound;{ parseFloat(total_amount)?.toFixed(2) || total_amount || 0 }</span>
            </div>
          </div>
        </div>


      </div>
      
      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="bottom-left" />
    </section>
  );
}

export default CartScreen;
