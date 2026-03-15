/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import {
  ROUTE_PERSONAL_INFORMATION,
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
  const navigate = useNavigate();
  const toastTR = useRef(null);
  const { email } = useParams() || {};
  const [isLoading, setIsLoading] = useState(false);

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
   * Verify access code
   * @param {*} values
   */
  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      const response = await authApi.verifyAccessCode({ ...values, email });
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDailog(
          "error",
          "Access code verification failed!",
          !empty(response_data?.message) && isString(response_data?.message)
            ? response_data.message
            : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
        );
      }

      navigate(`${ROUTE_PERSONAL_INFORMATION}/${encodeURIComponent(email)}`);
    } catch (error) {
      return responseDailog(
        "error",
        "Access code verification failed!",
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
