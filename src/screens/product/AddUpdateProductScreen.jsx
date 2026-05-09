/* eslint-disable react-hooks/exhaustive-deps */
import { Formik } from "formik";
import { Form, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

// css
import "./Product.css";

// components
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import InputField from "../../components/form/InputField";
import colors from "../../config/colors";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import { FaRegImage } from "react-icons/fa";
import SelectField from "../../components/form/SelectField";
import { conditions } from "../../data/conditions";
import { useContext, useEffect, useRef, useState } from "react";
import { empty, isArray, isObject, prepareResponseData } from "../../Utilities/utils";

import productApi from "../../api/Products";
import MainHeader from "../../components/header/mainHeader/MainHeader";
import { categories } from "../../data/categories";
import FullPageLoader from "../../components/loader/FullPageLoader";
import { Toast } from "primereact/toast";
import { ROUTE_PRODUCTS } from "../../config/constants";
import { useUserGuard } from "../../hooks/UserGuard";
import { AuthContext } from "../../hooks/UseAuth";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  name: Yup.string().required(required),
  description: Yup.string().required(required),
  condition: Yup.string().required(required),
  status: Yup.string().required(required),
  category: Yup.string().required(required),
  price: Yup.string().required(required),
  location: Yup.string().required(required),
});

function AddUpdateProductScreen() {
  useUserGuard();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [listingImage, setListingImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [ newImage, setNewImage] = useState(false);
  const toastTR = useRef(null);
  const { user } = useContext(AuthContext);
  const { product_id } = useParams() || {};
  const [ initialValues, setInitialValues ] = useState({
    name: "",
    description: "",
    condition: "",
    status: "",
    category: "",
    price: "",
    location: "",
  });

  useEffect(() => {
    if (!empty(product_id)) {
      if (!user) {
        return;
      }
      getProductDetails();
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
      setListingImage(details?.product_image || '');
      setInitialValues({
        name: details?.name || '',
        description: details?.description || '',
        condition: details?.condition || '',
        status: details?.status || '',
        category: details?.category || '',
        price: details?.price || '',
        location: details?.location || '',
      });
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };


  /**
   * Add product form submit handler
   * @param {*} values
   */
  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);

      values.product_image = listingImage;
      let response = null;
      if (!empty(product_id)) {
        values.product_id = product_id;
        values.new_image = newImage;
        response = await productApi.updateProduct(values);
      } else {
        response = await productApi.addProduct(values);
      }
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : `Failed to ${product_id ? "Update" : "Upload"} product!`,
        );
      }

      responseDialog(
        "success",
        "Success",
        `Product ${product_id ? "Updated" : "Uploaded" } Successfully.`,
      );
      setProcessed(true);
      setTimeout(() => {
        navigate(ROUTE_PRODUCTS);
      }, 2000)
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to trigger the hidden file input click
  const handleImageFilePickUp = () => {
    fileInputRef?.current?.click();
  };

  // Function to handle the selected file
  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();

        // Convert file to Base64 when the file is loaded
        reader.onloadend = async () => {
          const base64String = reader.result;
          setListingImage(base64String);
        };
        reader.readAsDataURL(file);

        if (product_id) {
          setNewImage(true);
        }
      }
    } catch (error) {}
  };

  return (
    <section className="main-wrapper">
      <Navbar active_screen="" />

      <div className="product-form-container">
        <MainHeader title="Add Product" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ handleChange, values }) => (
            <Form
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="field-container">
                <InputField
                  name="name"
                  placeholder="Enter product name"
                  fontSize={14}
                  required={true}
                  height={40}
                  width="100%"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.name || ''}
                  labelTitle="Product Name"
                />
              </div>
              <div className="field-container">
                <SelectField
                  labelTitle="Select Category"
                  required={true}
                  placeholder="Select Category"
                  name="category"
                  options={isArray(categories) ? categories : []}
                  height={40}
                  valueKey="value"
                  display="title"
                  containerWidth="100%"
                  selectedOption={values?.category}
                  handleChangeFunc={handleChange}
                />
              </div>
              <div className="field-container">
                <InputField
                  name="price"
                  placeholder="Enter product price"
                  fontSize={14}
                  required={true}
                  height={40}
                  width="100%"
                  type="number"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.price || ''}
                  labelTitle="Product Price"
                />
              </div>
              <div className="field-container">
                <InputField
                  name="description"
                  placeholder="Enter product description"
                  fontSize={14}
                  height={150}
                  rows={8}
                  cols={8}
                  required={true}
                  width="100%"
                  as="textarea"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.description || ''}
                  labelTitle="Product Description"
                />
              </div>
              <div className="field-container">
                <InputField
                  name="location"
                  placeholder="Enter pickup location"
                  fontSize={14}
                  height={100}
                  rows={8}
                  cols={8}
                  required={true}
                  width="100%"
                  as="textarea"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.location || ''}
                  labelTitle="Product pickup location"
                />
              </div>
              <div className="field-container">
                <SelectField
                  labelTitle="Select Condition"
                  required={true}
                  placeholder="Select Condition"
                  name="condition"
                  options={isArray(conditions) ? conditions : []}
                  height={40}
                  valueKey="value"
                  display="value"
                  containerWidth="100%"
                  selectedOption={values?.condition}
                  handleChangeFunc={handleChange}
                />
              </div>

              <div className="field-container">
                <div className="product-label">
                  <span>Product Image</span>
                  <span className="required">&nbsp;*</span>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <div className="product-image" onClick={handleImageFilePickUp}>
                  {empty(listingImage) ? (
                    <FaRegImage />
                  ) : (
                    <img src={listingImage} alt="preview" />
                  )}
                </div>
              </div>

              <div className="label mt-10">
                <span>Status</span>
                <span className="required">&nbsp;*</span>
              </div>
              <div
                className="flex flex-start"
                style={{ width: "100%", gap: 25, }}
              >
                <InputField
                  name="status"
                  fontSize={14}
                  height={25}
                  required={true}
                  width={25}
                  containerWidth="auto"
                  type="radio"
                  sideLabelTitle="Listed"
                  defaultOutline="transparent"
                  value="Listed"
                  labelMarginTop={4}
                  labelMarginLeft={8}
                  focusedOutline="transparent"
                />
                <InputField
                  name="status"
                  fontSize={14}
                  height={25}
                  required={true}
                  containerWidth="auto"
                  width={25}
                  type="radio"
                  sideLabelTitle="Unlisted"
                  defaultOutline="transparent"
                  value="Unlisted"
                  labelMarginTop={4}
                  labelMarginLeft={8}
                  focusedOutline="transparent"
                />
              </div>

              <div className="flex justify-center form-button-box w-100pc">
                { !processed && <ButtonIcon
                  buttonText={ !empty(product_id) ? "Update" : "Submit"}
                  backgroundColor={colors.primary}
                  borderColor={colors.primary}
                  color={colors.white}
                  height={51}
                  marginTop={2}
                  borderRadius={0}
                  fontSize={16}
                  className="form-button"
                  onClick={() => handleSubmit(values)}
                />}
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="top-right" />
    </section>
  );
}

export default AddUpdateProductScreen;
