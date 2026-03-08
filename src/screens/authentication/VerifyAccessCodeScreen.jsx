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
import verifyImage from "../../assets/elements/verify_data.svg";

// components
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import { empty, isString, prepareResponseData } from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  access_code: Yup.string().required(required),
});

const initialValues = {
  access_code: "",
};

function VerifyAccessCodeScreen() {
  const navigation = useNavigate();
  const toastTR = useRef(null);
  const location = useLocation();
  const params = location.state || {};
  const email = params.email || "";
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
            <img src={verifyImage} alt="sign up" />
          </div>
          <div className="form-wrapper">
            <h3>Verify Access Code</h3>

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
                      name="access_code"
                      placeholder="Enter access code"
                      fontSize={14}
                      height={30}
                      width="100%"
                      borderRadius={7}
                      backgroundColor={colors.ash}
                      paddingLeft={25}
                      paddingRight={25}
                      labelTitle="Access Code"
                    />
                  </div>

                  <div className="flex justify-center mt-30">
                    <ButtonIcon
                      buttonText="Verify"
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

export default VerifyAccessCodeScreen;
