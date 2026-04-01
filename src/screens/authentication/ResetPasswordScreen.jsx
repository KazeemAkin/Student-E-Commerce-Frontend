/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { Form, Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";

import InputField from "../../components/form/InputField";
import colors from "../../config/colors";

// css
import "./Signin.css";

// api
import authApi from "../../api/Authentication";

// image
import forgotPasswordImage from "../../assets/elements/forgot_password.svg";

// components
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import { empty, isString, prepareResponseData } from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { ROUTE_SIGN_IN } from "../../config/constants";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  password: Yup.string().required(required),
  confirm_password: Yup.string().required(required),
});

const initialValues = {
  password: "",
  confirm_password: "",
};

function ResetPasswordScreen() {
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reset_hash = searchParams.get("reset_hash");

  useEffect(() => {
    if (!isString(reset_hash) || reset_hash.length !== 36) {
      navigate(ROUTE_SIGN_IN);
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
   * Reset password
   * @param {*} values
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
      const response = await authApi.resetPassword({ ...values, reset_hash });
      const response_data = prepareResponseData(response);

      if (!response_data?.success) {
        return responseDailog(
          "error",
          "Failed to Reset Password!",
          !empty(response_data?.message) && isString(response_data?.message)
            ? response_data.message
            : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
        );
      }

      return navigate(ROUTE_SIGN_IN);
    } catch (error) {
      return responseDailog(
        "error",
        "Failed to Reset Password!",
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
            <img src={forgotPasswordImage} alt="reset password" />
          </div>
          <div className="form-wrapper">
            <h3>Reset Password</h3>

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
                      name="password"
                      placeholder="Enter password"
                      fontSize={14}
                      height={30}
                      width="100%"
                      type="password"
                      backgroundColor={colors.ash}
                      paddingLeft={25}
                      paddingRight={25}
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
                      type="password"
                      backgroundColor={colors.ash}
                      paddingLeft={25}
                      paddingRight={25}
                      labelTitle="Confirm Password"
                    />
                  </div>

                  <div className="flex justify-center mt-30">
                    <ButtonIcon
                      buttonText="Send"
                      backgroundColor={colors.primary}
                      borderColor={colors.primary}
                      color={colors.white}
                      width={198}
                      height={51}
                      marginTop={2}
                      borderRadius={0}
                      fontSize={16}
                      onClick={() => handleSubmit(values)}
                    />
                  </div>
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

export default ResetPasswordScreen;
