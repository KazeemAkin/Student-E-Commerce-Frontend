/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import { Form } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import * as Yup from "yup";

// css
import "./Product.css";

// components
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import SelectField from "../../components/form/SelectField";
import { useContext, useEffect, useRef, useState } from "react";
import { empty, isArray, prepareResponseData } from "../../Utilities/utils";

import productApi from "../../api/Products";
import MainHeader from "../../components/header/mainHeader/MainHeader";
import FullPageLoader from "../../components/loader/FullPageLoader";
import { Toast } from "primereact/toast";
import { useUserGuard } from "../../hooks/UserGuard";
import UserProducts from "./UserProducts";
import colors from "../../config/colors";
import { AuthContext } from "../../hooks/UseAuth";

const listingTypes = [
  {
    _id: 0,
    value: 'all',
  },
  {
    _id: 1,
    value: 'Listed'
  },
  {
    _id: 2,
    value: 'Unlisted'
  }
]

function ProductsScreen() {
  useUserGuard();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toastTR = useRef(null);
  const [activeProduct, setActiveProduct] = useState({});
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  useEffect(() => {
    if (user) {
      getUserProducts();
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

  const validationSchema = Yup.object().shape({
    filter: Yup.string().required("This field is required!"),
  });

  const initialValues = {
    filter: "",
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

  const filterList = (name, setFieldValue) => async (e) => {
    const value = e?.target?.value || '';
    setFieldValue(name, value);

    await getUserProducts(value);
  }

  const openDeleteModal = (product) => {
    setActiveProduct(product);
    setDisplayDeleteModal(true);
  }

  const deleteProduct = async () => {
    try {
      if (!isLoading) setIsLoading(true);
      const response = await productApi.deleteProduct(activeProduct?._id);
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : "Failed to delete products!",
        );
      }

      responseDialog(
        'success',
        'Successful',
        `Product ${activeProduct?.name || ''} deleted successfully`
      )

      return getUserProducts();
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong while delete the product.");
    } finally {
      setIsLoading(false);
      setDisplayDeleteModal(false);
    }
  }


  const deleteSessionDialogFooter = (
    <div>
      <Button
        label="Cancel"
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
        onClick={() => {
          setDisplayDeleteModal(false)
        }}
      />
      <Button
        label="Continue"
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
        onClick={() => deleteProduct()}
      />
    </div>
  );


  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />
      <div className="page-containers product-page">
        <MainHeader title="Products" />

        <div className="product-search-container field-container">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ setFieldValue, values }) => (
              <Form
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                }}
              >
                <SelectField
                  placeholder="Filter"
                  name="filter"
                  options={isArray(listingTypes) ? listingTypes : []}
                  height={35}
                  valueKey="value"
                  borderRadius={25}
                  display="value"
                  selectedOption={values?.filter}
                  handleChangeFunc={filterList("filter", setFieldValue)}
                />
              </Form>
            )}
          </Formik>
        </div>

        <div className="user-product-listings">
          {
            isArray(products) && !empty(products) && products.map((product) => (
              <UserProducts
                product_data={product}
                key={product?._id}
                deleteProduct={() => openDeleteModal(product)}
              />
            ))
          }
        </div>
      </div>

      <Dialog
        visible={displayDeleteModal}
        style={{ width: "32rem", zIndex: 999999 }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        headerStyle={{ fontSize: 14, borderBottom: `1px solid ${colors.ash}`, padding: '10px 15px' }}
        modal
        footer={deleteSessionDialogFooter}
        onHide={() => setDisplayDeleteModal(false)}
      >
        <div
          className="confirmation-content mt-10"
        >
          {
            <span>
              You are about to delete this listed product, <strong>{ activeProduct?.name || "" }</strong>, are you sure you want to continue?
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

export default ProductsScreen;
