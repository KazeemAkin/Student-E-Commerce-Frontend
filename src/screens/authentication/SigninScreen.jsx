import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import _ from "lodash";
import { ProgressSpinner } from "primereact/progressspinner";
import { NavLink, useNavigate } from "react-router-dom";

// component
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import InputField from "../../components/form/InputField";

// image
import appLogo from "../../assets/logo/white-logo.png";
import appLogo1 from "../../assets/logo/blue-logo.png";

// css
import "./Signin.css";

// apis
import authenticationApi from "../../api/SchoolAuthentication";

// utitlies
import { empty, prepareResponseData } from "../../Utilities/utils";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const initialValues = {
  password: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function SigninScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //ref
  const toastTR = useRef(null);

  //alert functions
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
      const email =
        !_.isUndefined(values) && !_.isUndefined(values.email)
          ? values.email
          : "";
      const password =
        !_.isUndefined(values) && !_.isUndefined(values.password)
          ? values.password
          : "";
      const response = await authenticationApi.signIn(email, password);
      const response_data = prepareResponseData(response);
      if (empty(response_data) || empty(response_data.success)) {
        const error_response = !empty(response_data.response)
          ? response_data.response
          : "Something went wrong!";
        return responseDailog("error", "Error Alert!", error_response);
      }

      navigate("/authentication/two-factor", { state: { email } });
    } catch (error) {
      alert(error);
      return responseDailog("error", "Error Alert!", "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signInBox">
      <div className="signInLogo">
        <img
          style={{ width: 80, height: "auto" }}
          src={appLogo1}
          alt="school logo"
        />
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Anciemdemia
        </span>
        <span>School Management System</span>
      </div>
      <aside className="leftSide">
        <div className="formBox">
          <div className="welcome">
            <p className="sectionTitle">
              <strong>SCHOOL LOGIN</strong>
            </p>
            <span className="fs-14">Hi, Welcome Back</span>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form style={{ width: "100%" }}>
              <InputField
                placeholder="Email"
                name="email"
                type="email"
                icon="envelope"
              />
              <InputField
                placeholder="Password"
                name="password"
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
                    "Sign In"
                  )
                }
                type="submit"
              />
              <div style={{ marginTop: 15, fontSize: 14 }}>
                Forgot Password?{" "}
                <NavLink
                  to="/forgot-password"
                  style={{ textDecoration: "none" }}
                >
                  Reset Password
                </NavLink>
              </div>
            </Form>
          </Formik>
        </div>
      </aside>
      <aside className="rightSide">
        <img
          style={{ width: "10rem", height: "auto" }}
          src={appLogo}
          alt="School logo"
        />
        <span style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          Anciemdemia
        </span>
        <span>School Management System</span>
      </aside>
      <Toast ref={toastTR} position="bottom-left" />
    </div>
  );
}

export default SigninScreen;
