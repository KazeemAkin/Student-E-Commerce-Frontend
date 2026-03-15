import { useContext, useRef, useState } from "react";
import * as Yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_SEND_ACCESS_CODE,
} from "../../config/constants";
import { Form, Formik } from "formik";

import InputField from "../../components/form/InputField";
import colors from "../../config/colors";

// css
import "./Signin.css";

// api
import authApi from "../../api/Authentication";

// image
import loginImage from "../../assets/elements/login.svg";

// components
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import { empty, isString, prepareResponseData } from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { AuthContext } from "../Root/ProtectedRoute";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format.").required(required),
  password: Yup.string().required(required),
});

const initialValues = {
  email: "",
  password: "",
};

function SignInScreen() {
  const navigate = useNavigate();
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(AuthContext);

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
   * Submit signup form
   * @param {*} values
   */
  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      const response = await authApi.signIn({ ...values });
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

      if (response_data?.response?.jwt?.accessToken) {
        localStorage.setItem(
          "studentAccessToken",
          response_data.response.jwt.accessToken,
        );
      }

      if (response_data?.response?.user) {
        setUser(response_data.response.user);
      }

      return navigate(ROUTE_HOME);
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
            <img src={loginImage} alt="sign up" />
          </div>
          <div className="form-wrapper">
            <h3>Login</h3>

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

                  <div className="sign-up">
                    <span>Not registered? &nbsp;&nbsp;</span>
                    <NavLink
                      to={ROUTE_SEND_ACCESS_CODE}
                      style={{ color: colors.primary }}
                    >
                      Signup
                    </NavLink>
                  </div>

                  <div className="flex justify-center mt-30">
                    <ButtonIcon
                      buttonText="Login"
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

                  <div className="sign-up mt-30">
                    <span>Can't remember your password? &nbsp;&nbsp;</span>
                    <NavLink
                      to={ROUTE_FORGOT_PASSWORD}
                      style={{ color: colors.primary }}
                    >
                      Forgot Password
                    </NavLink>
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

export default SignInScreen;
