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
import { NavLink } from "react-router-dom";
import { ROUTE_CHECKOUT } from "../../config/constants";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import EmptyDiv from "../../components/emptyDiv/EmptyDiv";

function CartScreen() {
  useUserGuard();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);
  const [products, setProducts] = useState([]);
  const [total_amount, setTotalAmount] = useState(0);
  const [openDeleteCartModal, setOpenDeleteCartModal] = useState(false);
  const [activeCartItem, setActiveCartItem] = useState({});

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


  const deleteCartItem = async (value) => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await productApi.deleteProductFromCart(activeCartItem?._id || '');
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to delete item from cart!",
        );
      }
      
      setOpenDeleteCartModal(false);
      responseDialog(
        "success",
        "Success",
        `Cart item deleted successfully.`,
      );
      getProductsCart();
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const showModal = (cartItem) => {
    setOpenDeleteCartModal(true);
    setActiveCartItem(cartItem);
  }

  const deleteCartDialogFooter = (
    <div>
      <Button
        label="Cancel"
        style={{
          backgroundColor: colors.primary,
          color: colors.white,
          borderColor: colors.primary,
          borderWidth: 1,
          height: 33,
          borderRadius: 25,
          width: 110,
          fontSize: 14,
          fontWeight: 200
        }}
        onClick={() => {
          setOpenDeleteCartModal(false)
        }}
      />
      <Button
        label="Delete"
        style={{
          backgroundColor: colors.red,
          color: colors.white,
          borderColor: colors.red,
          borderWidth: 1,
          height: 33,
          borderRadius: 25,
          width: 110,
          fontSize: 14,
          fontWeight: 200
        }}
        onClick={() => deleteCartItem()}
      />
    </div>
  );


  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />
      <div className="page-containers cart-page">
        <div className="cart-items-box">
          <div className="header">Cart</div>
          <div className="cart-items">
            {
              isArray(products) && !empty(products) ? products.map(product => 
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
                    <div className="trash" onClick={() => showModal(product)}>
                      <FaTrash color={colors.red} />&nbsp;<span className="label">Remove</span>
                    </div>
                    { product?.status?.toLowerCase() === 'listed' && <div className="action">
                      <NavLink to={`${ROUTE_CHECKOUT}/${product?._id}`} style={{ textDecoration: 'none' }}>
                        <div className="checkout">
                          <FaWallet />
                          <span className="label">Checkout</span>
                        </div>
                      </NavLink>
                      <div className="chat">
                        <MdChat />
                        <span className="label">Chat</span>
                      </div>
                    </div>}
                  </div>
                </div>
            ) : <EmptyDiv />}
          </div>
        </div>

        <div className="cart-summary">
          <div className="header">Cart Summary</div>
          <div className="subtotal">
            <span className="title">Subtotal</span>
            <span className="cost">&pound;{ parseFloat(total_amount)?.toFixed(2) || total_amount || 0 }</span>
          </div>

          {/* <div className="bottom">
            <div className="checkout-button">
              <span className="title">Checkout</span>
              <span className="cost">&pound;{ parseFloat(total_amount)?.toFixed(2) || total_amount || 0 }</span>
            </div>
          </div> */}
        </div>
      </div>
      

      <Dialog
        visible={openDeleteCartModal}
        style={{ width: "32rem", zIndex: 999999 }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        headerStyle={{ fontSize: 14, borderBottom: `1px solid ${colors.ash}`, padding: '10px 15px' }}
        modal
        footer={deleteCartDialogFooter}
        onHide={() => setOpenDeleteCartModal(false)}
      >
        <div
          className="confirmation-content mt-10"
        >
          {
            <span>
              You are about to delete this listed cart item, <strong>{ activeCartItem?.name || "" }</strong>, are you sure you want to continue?
            </span>
          }
        </div>
      </Dialog>
      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="bottom-left" />
    </section>
  );
}

export default CartScreen;
