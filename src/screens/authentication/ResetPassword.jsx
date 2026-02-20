/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { empty, prepareResponseData } from "../../Utilities/utils";

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
import { Toast } from "primereact/toast";

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  confirm_password: Yup.string().required("Password is required"),
});

// start
function ResetPassword() {
  const navigate = useNavigate();
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const [resetHash, setResetHash] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setResetHash(!empty(searchParams.get("resetHash"))
      ? searchParams.get("resetHash")
      : "");
    setEmail(!empty(searchParams.get("email")) ? searchParams.get("email") : "");
    if (empty(resetHash) || empty(email)) {
      return navigate("/404");
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

  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      if (empty(values)) {
        return responseDailog(
          "error",
          "Error Response",
          "Something went wrong!"
        );
      }
      const password = !empty(values.password) ? values.password : "";
      const confirmPassword = !empty(values.confirm_password)
        ? values.confirm_password
        : "";
      const response = await authenticationApi.resetPassword(
        email,
        password,
        confirmPassword,
        resetHash
      );
      const response_data = prepareResponseData(response);
      if (empty(response_data) || !response_data.success) {
        if (response_data.statusCodeType === "forbidden") {
          return navigate("/401");
        }
        return responseDailog(
          "error",
          "Error Response",
          !empty(response_data.response)
            ? response_data.response
            : "Something went wrong!"
        );
      }
      if (localStorage.getItem("schoolAccessToken") !== null) {
        localStorage.removeItem("schoolAccessToken");
      }

      responseDailog("success", "Success", "Password reset successful.");

      return setTimeout(() => {
        navigate("/");
      }, 2000);
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
              <strong>RESET PASSWORD</strong>
            </p>
            <span>Set up a new password for your account</span>
          </div>
          <Formik
            initialValues={{
              password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form style={{ width: "100%" }}>
              <InputField
                placeholder="Password"
                name="password"
                type="password"
                icon="key"
              />
              <InputField
                placeholder="Confirm Password"
                name="confirm_password"
                type="password"
                icon="key"
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
            </Form>
          </Formik>
        </div>
      </aside>
      <aside className="rightSide">
        <img style={{ width: 200, height: "auto" }} src={appLogo} alt="logo" />
        <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
          Anciemdemia
        </span>
        <span>A School Management System</span>
      </aside>
      <Toast ref={toastTR} position="bottom-left" />
    </div>
  );
}

export default ResetPassword;
