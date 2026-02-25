import { useRef, useState } from "react";
import * as Yup from "yup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import {
  ROUTE_LOGIN,
  ROUTE_REGISTRATION_SUCCESSFUL,
} from "../../config/constants";
import { Form, Formik } from "formik";

import InputField from "../../components/form/InputField";
import colors from "../../config/colors";

// css
import "./Signin.css";

// api
import authApi from "../../api/Authentication";

// image
import signupImage from "../../assets/elements/email.svg";

// components
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import SelectField from "../../components/form/SelectField";
import { empty, isString, prepareResponseData } from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { genderData } from "../../data/genderData";

const required = "This field is required!";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(required),
  lastName: Yup.string().required(required),
  username: Yup.string().required(required),
  gender: Yup.string().required(required),
  countryOfOrigin: Yup.string().required(required),
  stateOrRegion: Yup.string().required(required),
  password: Yup.string().required(required),
  confirmPassword: Yup.string().required(required),
});

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  gender: "",
  countryOfOrigin: "",
  stateOrRegion: "",
  password: "",
  confirmPassword: "",
};
const signupTrail = [
  { machine_name: "firstName", title: "First Name" },
  { machine_name: "lastName", title: "Last Name" },
  { machine_name: "gender", title: "Gender" },
  { machine_name: "countryOfOrigin", title: "Country of Origin" },
  { machine_name: "stateOrRegion", title: "State or Region" },
  { machine_name: "username", title: "Username" },
  { machine_name: "password", title: "Password" },
  { machine_name: "confirmPassword", title: "Confirm Password" },
];

function PersonalInformationScreen() {
  const [curInputField, setCurInputField] = useState(0);
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

  const nextFormField = (values) => {
    try {
      const currentTrail = signupTrail?.[curInputField] || {};
      if (empty(values?.[currentTrail?.machine_name])) {
        return responseDailog(
          "error",
          "Required Input!",
          `${currentTrail.title} field is required!`,
        );
      }
      if (curInputField !== 7) {
        setCurInputField(curInputField + 1);
      }
    } catch (error) {}
  };

  const prevFormField = () => {
    try {
      if (curInputField !== 0) {
        setCurInputField(curInputField - 1);
      }
    } catch (error) {}
  };

  return (
    <>
      <section className="login-page-wrapper">
        <Navbar active_screen="" />
        <div className="login-container">
          <div className="element-wrapper">
            <img src={signupImage} alt="sign up" />
          </div>
          <div className="form-wrapper">
            <h3>Send Access Code</h3>

            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              {({ handleChange, values }) => (
                <Form style={{ width: "100%", marginTop: 50 }}>
                  {signupTrail.map((trail, index) => {
                    return (
                      <div className="field-container" key={index + 2}>
                        {trail?.machine_name !== "gender" &&
                        index === curInputField ? (
                          <InputField
                            name={trail.machine_name}
                            uniqueId={index + 1}
                            placeholder={`Type your ${trail.title}`}
                            fontSize={14}
                            height={30}
                            type={
                              trail?.machine_name === "password" ||
                              trail?.machine_name === "confirmPassword"
                                ? "password"
                                : "text"
                            }
                            borderRadius={7}
                            backgroundColor={colors.lightgray}
                            labelTitle={trail.title}
                          />
                        ) : (
                          trail?.machine_name === "gender" &&
                          index === curInputField && (
                            <SelectField
                              index={index + 1}
                              labelTitle="Gender"
                              placeholder="Select Gender"
                              name="gender"
                              fontSize={14}
                              options={genderData}
                              height={45}
                              required={true}
                              valueKey="gender"
                              selectedOption={values.gender}
                              handleChangeFunc={handleChange}
                            />
                          )
                        )}
                      </div>
                    );
                  })}

                  <div className="flex col-g-14">
                    {curInputField !== 0 && (
                      <div className="auth-btn-container">
                        <ButtonIcon
                          buttonText="Previous"
                          backgroundColor={colors.secondary}
                          color={colors.dark}
                          width="100%"
                          marginTop={2}
                          borderRadius={0}
                          onClick={() => prevFormField()}
                        />
                      </div>
                    )}
                    {curInputField !== 7 && (
                      <div className="auth-btn-container">
                        <ButtonIcon
                          buttonText="Next"
                          backgroundColor={colors.primaryDark}
                          color={colors.white}
                          width="100%"
                          marginTop={2}
                          borderRadius={0}
                          onClick={() => nextFormField(values)}
                        />
                      </div>
                    )}

                    {curInputField === 7 && (
                      <div className="auth-btn-container">
                        <ButtonIcon
                          buttonText="Continue"
                          backgroundColor={colors.primaryDark}
                          color={colors.white}
                          width="100%"
                          marginTop={2}
                          borderRadius={0}
                          onClick={() => handleSubmit(values)}
                        />
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
            <div className="other-accounts">
              <div className="sign-up">
                <span>Already have an account?</span>
                <NavLink to={ROUTE_LOGIN}>Sign In</NavLink>
              </div>
            </div>
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
