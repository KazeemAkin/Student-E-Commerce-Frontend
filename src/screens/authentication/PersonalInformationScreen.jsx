/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import {
  ROUTE_SEND_ACCESS_CODE,
  ROUTE_USER_TYPE,
} from "../../config/constants";
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
import { AuthContext } from "../Root/ProtectedRoute";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(required),
  last_name: Yup.string().required(required),
  phone_number: Yup.string().required(required),
  username: Yup.string().required(required),
  password: Yup.string().required(required),
  confirm_password: Yup.string().required(required),
});

const initialValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  username: "",
  password: "",
  confirm_password: "",
};

function PersonalInformationScreen() {
  const navigate = useNavigate();
  const toastTR = useRef(null);
  const { email } = useParams() || {};
  const [isLoading, setIsLoading] = useState(false);
  const [visibleScreen, setVisisbleScreen] = useState("personal_information");
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    if (empty(email)) {
      navigate(ROUTE_SEND_ACCESS_CODE);
    }
  }, []);

  // alert functions
  const responseDailog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  /**
   * Submit form
   * @param {*} values
   * @returns
   */
  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      if (values?.password !== values?.confirm_password) {
        return responseDailog(
          "error",
          "Password mismatch!",
          "Password and confirm password fields must match. Please correct the error and try again.",
        );
      }
      const response = await authApi.signup({
        ...values,
        email,
      });
      const response_data = prepareResponseData(response);
      if (!response_data?.success) {
        return responseDailog(
          "error",
          "Sign up failed!",
          !empty(response_data?.message) && isString(response_data?.message)
            ? response_data.message
            : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
        );
      }

      if (response_data?.response?.jwt?.accessToken) {
        localStorage.setItem(
          "studentAccessToken",
          response_data.response.jwt.accessToken,
        );
      }

      if (response_data?.response?.user) {
        setUser(response_data.response.user);
      }

      return navigate(ROUTE_USER_TYPE);
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
            <h3>
              {visibleScreen === "personal_information"
                ? "Personal Information"
                : "Authentication"}
            </h3>
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
                  {visibleScreen === "personal_information" && (
                    <>
                      <div className="field-container">
                        <InputField
                          name="first_name"
                          placeholder="Enter first name"
                          fontSize={14}
                          height={30}
                          width="100%"
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
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="Phone Number"
                        />
                      </div>
                    </>
                  )}

                  {visibleScreen === "authentication" && (
                    <>
                      <div className="field-container">
                        <InputField
                          name="username"
                          placeholder="Enter username"
                          fontSize={14}
                          height={30}
                          width="100%"
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          labelTitle="Username"
                        />
                      </div>
                      <div className="field-container">
                        <InputField
                          name="password"
                          placeholder="Enter password"
                          fontSize={14}
                          height={30}
                          width="100%"
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          type="password"
                          labelTitle="Password"
                        />
                      </div>
                      <div className="field-container">
                        <InputField
                          name="confirm_password"
                          placeholder="Confirm password"
                          fontSize={14}
                          height={30}
                          width="100%"
                          backgroundColor={colors.ash}
                          paddingLeft={25}
                          paddingRight={25}
                          type="password"
                          labelTitle="Confirm Password"
                        />
                      </div>
                    </>
                  )}
                  {visibleScreen === "personal_information" ? (
                    <div className="next-btn-container mt-30">
                      <ButtonIcon
                        buttonText="Next"
                        backgroundColor={colors.primary}
                        borderColor={colors.primary}
                        color={colors.white}
                        marginTop={2}
                        fontSize={16}
                        borderRadius={0}
                        onClick={() => setVisisbleScreen("authentication")}
                        className="next-btn"
                      />
                    </div>
                  ) : (
                    <div className="prev-btn-container">
                      <ButtonIcon
                        buttonText="Previous"
                        backgroundColor={colors.primary}
                        borderColor={colors.primary}
                        color={colors.white}
                        marginTop={2}
                        fontSize={16}
                        borderRadius={0}
                        onClick={() =>
                          setVisisbleScreen("personal_information")
                        }
                        className="prev-btn"
                      />
                      <ButtonIcon
                        buttonText="Submit"
                        backgroundColor={colors.primary}
                        borderColor={colors.primary}
                        color={colors.white}
                        marginTop={2}
                        fontSize={16}
                        borderRadius={0}
                        onClick={() => handleSubmit(values)}
                        className="submit-btn"
                      />
                    </div>
                  )}
                </Form>
              )}
            </Formik>
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
