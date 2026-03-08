import { useRef, useState } from "react";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ROUTE_REGISTRATION_SUCCESSFUL } from "../../config/constants";
import { Form, Formik } from "formik";

import InputField from "../../components/form/InputField";
import colors from "../../config/colors";

// css
import "./Signin.css";

// api
import authApi from "../../api/Authentication";

// image
import informationImage from "../../assets/elements/information_tab.svg";
import authenticationImage from "../../assets/elements/authenticate.svg";

// components
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import { empty, isString, prepareResponseData } from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(required),
  last_name: Yup.string().required(required),
  phone_number: Yup.string().required(required),
});

const initialValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
};

function PersonalInformationScreen() {
  const navigation = useNavigate();
  const toastTR = useRef(null);
  const location = useLocation();
  const params = location.state || {};
  const email = params.email || "";
  const [isLoading, setIsLoading] = useState(false);
  const [visibleScreen, setVisisbleScreen] = useState("personal_information");

  // alert functions
  const responseDailog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  // handle personal information data
  const handlePersonalInformation = async (values) => {
    try {
      setVisisbleScreen("authentication");
    } catch (error) {
      return responseDailog(
        "error",
        "Something went wrong!",
        !empty(error?.message) && isString(error?.message)
          ? error.message
          : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
      );
    }
  };

  /**
   * Submit signup form
   * @param {*} values
   */
  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      const response = await authApi.signUp({ ...values, email });
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDailog(
          "error",
          "Sign up failed!",
          !empty(response_data?.message) && isString(response_data?.message)
            ? response_data.message
            : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
        );
      }

      navigation(ROUTE_REGISTRATION_SUCCESSFUL);
    } catch (error) {
      return responseDailog(
        "error",
        "Sign up failed!",
        !empty(error?.message) && isString(error?.message)
          ? error.message
          : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="login-page-wrapper">
        <Navbar active_screen="" include_search={false} />
        <div className="login-container">
          <div className="element-wrapper">
            <img
              src={
                visibleScreen === "personal_information"
                  ? informationImage
                  : authenticationImage
              }
              alt="sign up"
            />
          </div>
          <div className="form-wrapper">
            {visibleScreen === "personal_information" ? (
              <>
                <h3>Personal Information</h3>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({ values }) => (
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
                          name="first_name"
                          placeholder="Enter first name"
                          fontSize={14}
                          height={30}
                          width="100%"
                          borderRadius={7}
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="First Name"
                        />
                      </div>
                      <div className="field-container">
                        <InputField
                          name="last_name"
                          placeholder="Enter last name"
                          fontSize={14}
                          height={30}
                          width="100%"
                          borderRadius={7}
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="Last Name"
                        />
                      </div>
                      <div className="field-container">
                        <InputField
                          name="phone_number"
                          placeholder="Enter phone number"
                          fontSize={14}
                          height={30}
                          width="100%"
                          borderRadius={7}
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="Phone Number"
                        />
                      </div>

                      <div
                        className="flex flex-end mt-30"
                        style={{ width: "70%" }}
                      >
                        <ButtonIcon
                          buttonText="Next"
                          backgroundColor={colors.primary}
                          borderColor={colors.primary}
                          color={colors.white}
                          width={198}
                          height={51}
                          marginTop={2}
                          fontSize={16}
                          borderRadius={0}
                          onClick={() => handlePersonalInformation(values)}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <>
                <h3>Authentication</h3>
                <Formik
                  enableReinitialize
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                >
                  {({ values }) => (
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
                          name="first_name"
                          placeholder="Enter first name"
                          fontSize={14}
                          height={30}
                          width="100%"
                          borderRadius={7}
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="First Name"
                        />
                      </div>
                      <div className="field-container">
                        <InputField
                          name="last_name"
                          placeholder="Enter last name"
                          fontSize={14}
                          height={30}
                          width="100%"
                          borderRadius={7}
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="Last Name"
                        />
                      </div>
                      <div className="field-container">
                        <InputField
                          name="phone_number"
                          placeholder="Enter phone number"
                          fontSize={14}
                          height={30}
                          width="100%"
                          borderRadius={7}
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="Phone Number"
                        />
                      </div>

                      <div
                        className="flex space-between mt-30"
                        style={{ width: "70%" }}
                      >
                        <ButtonIcon
                          buttonText="Previous"
                          backgroundColor={colors.primary}
                          borderColor={colors.primary}
                          color={colors.white}
                          width={198}
                          height={51}
                          marginTop={2}
                          fontSize={16}
                          borderRadius={0}
                          onClick={() =>
                            setVisisbleScreen("personal_information")
                          }
                        />
                        <ButtonIcon
                          buttonText="Submit"
                          backgroundColor={colors.primary}
                          borderColor={colors.primary}
                          color={colors.white}
                          width={198}
                          height={51}
                          marginTop={2}
                          fontSize={16}
                          borderRadius={0}
                          onClick={() => handleSubmit(values)}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </section>
      {/* footer */}
      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="bottom-left" />
    </>
  );
}

export default PersonalInformationScreen;
