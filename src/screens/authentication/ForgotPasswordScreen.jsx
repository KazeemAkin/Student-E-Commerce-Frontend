import { useRef, useState } from "react";
import * as Yup from "yup";
import { Toast } from "primereact/toast";
import { Form, Formik } from "formik";

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

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format.").required(required),
});

const initialValues = {
  email: "",
};

function ForgotPasswordScreen() {
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

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
   * Forgot password
   * @param {*} values
   */
  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      const response = await authApi.forgotPassword({ ...values });
      const response_data = prepareResponseData(response);

      if (!response_data.success) {
        return responseDailog(
          "error",
          "Failed to sign in!",
          !empty(response_data?.message) && isString(response_data?.message)
            ? response_data.message
            : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
        );
      }

      return responseDailog(
        "success",
        "Access code sent!",
        "An access code has been sent to your email address. Please check your inbox and follow the instructions to reset your password.",
      );
    } catch (error) {
      return responseDailog(
        "error",
        "Failed to sign in!",
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
            <img src={forgotPasswordImage} alt="forgot password" />
          </div>
          <div className="form-wrapper">
            <h3>Forgot Password</h3>

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
                      name="email"
                      placeholder="Enter school email"
                      fontSize={14}
                      height={30}
                      width="100%"
                      type="email"
                      backgroundColor={colors.ash}
                      paddingLeft={25}
                      paddingRight={25}
                      labelTitle="Email"
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

export default ForgotPasswordScreen;
