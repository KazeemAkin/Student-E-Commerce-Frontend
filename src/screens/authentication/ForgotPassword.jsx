import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { empty, isUndefined, prepareResponseData } from "../../Utilities/utils";

// component
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import InputField from "../../components/form/InputField";
import { ProgressSpinner } from "primereact/progressspinner";

// css
import "./Signin.css";

// image
import appLogo from "../../assets/logo/white-logo.png";

// apis
import authenticationApi from "../../api/Authentication";
import { NavLink } from "react-router-dom";
import { Toast } from "primereact/toast";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

// start
function ForgotPassword() {
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // alert functions
  const responseDailog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 12000,
    });
  };

  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      const email =
        !isUndefined(values) && !isUndefined(values.email) ? values.email : "";
      const response = await authenticationApi.forgotPassword(email);
      const response_data = prepareResponseData(response);
      if (empty(response_data) || !response_data.success) {
        return responseDailog(
          "error",
          "Error Response",
          !empty(response_data.response)
            ? response_data.response
            : "Something went wrong!"
        );
      }

      responseDailog(
        "success",
        "Success",
        "A password reset link has been sent to your registered email address. Check your mail and follow the instructions to reset your password."
      );
    } catch (error) {
      return responseDailog("error", "Error Response", "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signInBox">
      <aside className="leftSide">
        <div className="formBox">
          <div className="welcome">
            <p className="sectionTitle">
              <strong>FORGOT PASSWORD</strong>
            </p>
            <span>Enter the email you registered with.</span>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form style={{ width: "100%" }}>
              <InputField
                placeholder="Enter your email"
                name="email"
                type="email"
                icon="envelope"
              />

              <ButtonIcon
                height={45}
                marginTop={5}
                color="#ffffff"
                backgroundColor="#633ccd"
                width="100%"
                borderColor="#633ccd"
                buttonText={
                  isLoading ? (
                    <ProgressSpinner
                      style={{ width: 25, height: 25 }}
                      strokeWidth={7}
                      animationDuration={0.5}
                    />
                  ) : (
                    "Submit"
                  )
                }
                type="submit"
              />
              <div style={{ marginTop: 10 }}>
                Done? Go back to{" "}
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  SignIn Page
                </NavLink>
              </div>
            </Form>
          </Formik>
        </div>
      </aside>
      <aside className="rightSide">
        <img style={{ width: 200, height: "auto" }} src={appLogo} />
        <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Anciemdemia
        </span>
        <span>A School Management System</span>
      </aside>
      <Toast ref={toastTR} position="bottom-left" />
    </div>
  );
}

export default ForgotPassword;
