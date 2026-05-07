/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Rating } from "primereact/rating";

import './PurchaseHistory.css';
import MainHeader from '../../components/header/mainHeader/MainHeader';
import Footer from '../../components/footer/Footer';
import FullPageLoader from '../../components/loader/FullPageLoader';
import { Toast } from 'primereact/toast';
import { empty, isArray, prepareResponseData } from '../../Utilities/utils';
import EmptyDiv from '../../components/emptyDiv/EmptyDiv';

// api 
import transactionApi from "../../api/Transaction";

// image 
import default_image from "../../assets/broken-image.png";
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../hooks/UseAuth';
import colors from '../../config/colors';
import { Dialog } from 'primereact/dialog';

function PurchaseHistory() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [activeTransaction, setActiveTransaction] = useState({});
  const [value, setValue] = useState(null);
  const toastTR = useRef(null);
  const [openRatingModal, setOpenRatingModal] = useState(false);

  // alert functions
  const responseDialog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  useEffect(() => {
    if (user) {
      getProductDetails();
    }
  }, [user]);


  const getProductDetails = async () => {
    try {
      if (!isLoading) setIsLoading(true);

      const response = await transactionApi.getPurchaseHistory();
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to fetch purchase history!",
        );
      }

      const history = isArray(response_data?.response) ? response_data.response : [];
      setPurchaseHistory(history);
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };


  const rateTransaction = async (value) => {
    try {
      if (!isLoading) setIsLoading(true);

      const payload = {
        transaction_id: activeTransaction?._id || '',
        rate_count: value
      }
      const response = await transactionApi.rateTransaction(payload);
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to rate purchase item!",
        );
      }
      
      setOpenRatingModal(false);
      responseDialog(
        "success",
        "Success",
        `Rating successful.`,
      );
      getProductDetails();
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const showRatingModal = (purchase_item) => {
    setOpenRatingModal(true);
    setActiveTransaction(purchase_item);
  }

  return (
    <section className="main-wrapper purchase-history-page">
      <Navbar active_screen="" />

      <div className="purchase-history">
        <MainHeader title="Purchase History" />

        <div className="purchase-history-wrapper">
          {
            !empty(purchaseHistory) && isArray(purchaseHistory) ?
              <div className='history-item'>
                {
                  isArray(purchaseHistory) && purchaseHistory.map(purchase_item => 
                    <div className="cart-item" key={purchase_item?._id}>
                      <div className="top">
                        <div className="left">
                          <div className="img-container">
                            { purchase_item?.product_image ? <img src={purchase_item?.product_image} alt="" /> : <img src={default_image} alt="" />}
                          </div>
                          <div className="name-box">
                            <div className="name">{purchase_item?.product_name || 'N/A'}
                            </div>
                            <div className="name sub"><strong>Category: </strong>{purchase_item?.product_category || 'N/A'}
                            </div>
                            <div className="name sub">
                              <strong>Payment Method: </strong>{purchase_item?.payment_method || 'N/A'}
                            </div>
                            <div className="name sub">
                              <strong>Transaction Status: </strong>
                              <span  style={{ color: purchase_item?.transaction_status === 'Completed' ? colors.green : colors.black, fontWeight: 'bold' }}>
                                {purchase_item?.transaction_status || 'N/A'}
                              </span>
                            </div>
                          </div>
                         </div>
                        
                      <div className="right">
                        <span className="price">&pound;{ parseFloat(purchase_item?.amount)?.toFixed(2) || purchase_item?.amount || 'N/A' }</span>
                      </div>
                    </div>

                    <div className='seller-details'>
                      <div className="name-box">
                        <div className="name"><strong>Buyer Name: </strong>{ purchase_item?.seller_full_name || 'N/A'}</div>
                      </div>
                      <div className="name-box">
                        <div className="name"><strong>Buyer School: </strong>{ purchase_item?.seller_school || 'N/A'} { purchase_item.seller_year ? `(${purchase_item?.seller_year})` : ''}</div>
                      </div>
                      <div className="name-box">
                        <div className="name"><strong>Purchase Date: </strong>{ purchase_item?.dateCreated || 'N/A'}</div>
                      </div>
                    </div>
                    <div className="bottom">
                      <div className="action">
                        { purchase_item?.rated === false ? 
                          <div className="checkout" onClick={() => showRatingModal(purchase_item)}>
                            <FaStar />
                            <span className="label">Rate</span>
                          </div>
                            :
                            <Rating value={purchase_item?.rating || null} readOnly cancel={false} />
                        }
                      </div>
                    </div>
                    </div>
                )}
              </div> :
              <EmptyDiv />
          }
        </div>
      </div>
      
      <Dialog
        visible={openRatingModal}
        style={{ width: "32rem", zIndex: 999999 }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        headerStyle={{ fontSize: 14, borderBottom: `1px solid ${colors.ash}`, padding: '10px 15px' }}
        modal
        onHide={() => setOpenRatingModal(false)}
      >
        <div
          className="confirmation-content mt-10"
        >
          <Rating value={value} onChange={(e) => {
              setValue(e.value);
              rateTransaction(e.value);
            }} cancel={false} />
        </div>
      </Dialog>

      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="top-right" />
    </section>
  )
}

export default PurchaseHistory