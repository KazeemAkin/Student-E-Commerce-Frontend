import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { empty, isUndefined, prepareResponseData } from "../../Utilities/utils";

// component
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import InputField from "../../components/form/InputField";
import { ProgressSpinner } from "primereact/progressspinner";

// css
import "./Signin.css";

// image
import appLogo from "../../assets/logo/white-logo.png";
import appLogo1 from "../../assets/logo/blue-logo.png";

// apis
import authenticationApi from "../../api/SchoolAuthentication";
import { Toast } from "primereact/toast";

const initialValues = {
  access_code: "",
};

const validationSchema = Yup.object().shape({
  access_code: Yup.string().min(6).max(6).required("Access Code is required."),
});

// start
function TwoFactorAuthentication() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  //ref
  const toastTR = useRef(null);
  const email =
    !empty(location) && !empty(location.state) && !empty(location.state.email)
      ? location.state.email
      : "";

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
      const access_code =
        !isUndefined(values) && !isUndefined(values.access_code)
          ? values.access_code
          : "";
      const response = await authenticationApi.twoFactorAuthentication(
        email,
        access_code
      );
      const response_data = prepareResponseData(response);
      if (empty(response_data) || empty(response_data.success)) {
        const error = !empty(response_data.response)
          ? response_data.response
          : "Something went wrong!";
        responseDailog("error", "Error Alert", error);
      }
      navigate("/dashboard");
    } catch (error) {
      responseDailog("error", "Internal Server Error", "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signInBox">
      <div className="signInLogo">
        <img style={{ width: 80, height: "auto" }} src={appLogo1} alt="logo"/>
        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Anciemdemia
        </span>
        <span>A School Management System</span>
      </div>
      <aside className="leftSide">
        <div className="formBox">
          <div className="welcome">
            <p className="sectionTitle">
              <strong>TWO FACTOR AUTHENTICATION</strong>
            </p>
            <span>Enter the six(6) digit access code sent to your email</span>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form style={{ width: "100%" }}>
              <InputField
                placeholder="Access Code"
                name="access_code"
                type="text"
                icon="key"
                height={50}
                fontSize={16}
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
                      className="button_spinner"
                    />
                  ) : (
                    "Submit"
                  )
                }
                type="submit"
              />
            </Form>
          </Formik>
          <NavLink to="/" style={{ marginTop: 10 }}>
            Go back to login page.
          </NavLink>
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

export default TwoFactorAuthentication;
