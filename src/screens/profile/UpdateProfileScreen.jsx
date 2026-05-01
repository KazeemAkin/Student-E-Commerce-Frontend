/* eslint-disable react-hooks/exhaustive-deps */
import * as Yup from "yup";
import Navbar from "../../components/navbar/Navbar";
import ProfileHeader from "./ProfileHeader";

// api
import userApi from "../../api/User";

// css
import "./Profile.css";
import Footer from "../../components/footer/Footer";
import { useUserGuard } from "../../hooks/UserGuard";
import { useContext, useEffect, useRef, useState } from "react";
import { empty, isArray, prepareResponseData } from "../../Utilities/utils";
import { AuthContext } from "../../hooks/UseAuth";
import { useParams } from "react-router-dom";
import MainHeader from "../../components/header/mainHeader/MainHeader";
import { Form, Formik } from "formik";
import InputField from "../../components/form/InputField";
import colors from "../../config/colors";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import FullPageLoader from "../../components/loader/FullPageLoader";
import { Toast } from "primereact/toast";
import SelectField from "../../components/form/SelectField";
import { schoolYears } from "../../data/SchoolYears";


const required = "This field is required!";
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required(required),
  last_name: Yup.string().required(required),
  phone_number: Yup.string().required(required),
  school: Yup.string().optional(),
  dorm: Yup.string().optional(),
  year: Yup.string().optional(),
});

function UpdateProfileScreen() {
  useUserGuard();
  const { user } = useContext(AuthContext);
  const { user_id } = useParams() || {};
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ initialValues, setInitialValues ] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    school: "",
    dorm: "",
    year: "",
  });

  useEffect(() => {
    if (!empty(user_id)) {
      if (!user) {
        return;
      }

      setInitialValues({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone_number: user?.phone_number || '',
        school: user?.school || '',
        dorm: user?.dorm || '',
        year: user?.year || ''
      })
    }
  }, [user]);

  // alert functions
  const responseDialog = (severity = null, summary = null, detail = null) => {
    toastTR?.current?.show({
      severity,
      summary,
      detail,
      life: 8000,
    });
  };

  /**
   * Update profile
   * @param {*} values 
   * @returns 
   */
  const updateProfile = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      const response = await userApi.updateProfile(values);
      
      const response_data = prepareResponseData(response);
      if (!response_data.success) {
        return responseDialog(
          "error",
          "Error Alert",
          !empty(response_data) && !empty(response_data.response)
            ? response_data.response
            : `Failed to Update profile!`,
        );
      }

      return responseDialog(
        "success",
        "Success",
        `Profile updated Successfully.`,
      );
    } catch (error) {
      responseDialog("error", "Error Alert", "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="main-wrapper profile-page">
      <Navbar active_screen="" />

      {/* profile header section */}
      <ProfileHeader />
      <div className="update-profile-form">
        <MainHeader title="Edit Profile" borderBottom={`1px solid ${colors.ash}`} marginBottom={20} />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {({ handleChange, values }) => (
            <Form>
              <div className="field-container">
                <InputField
                  name="first_name"
                  placeholder="Enter First Name"
                  fontSize={14}
                  required={true}
                  height={40}
                  width="100%"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.first_name || ''}
                  labelTitle="First Name"
                />
              </div>
              <div className="field-container">
                <InputField
                  name="last_name"
                  placeholder="Enter Last Name"
                  fontSize={14}
                  required={true}
                  height={40}
                  width="100%"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.last_name || ''}
                  labelTitle="Last Name"
                />
              </div>
              <div className="field-container">
                <InputField
                  name="phone_number"
                  placeholder="Enter Phone Number"
                  fontSize={14}
                  required={true}
                  height={40}
                  width="100%"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.phone_number || ''}
                  labelTitle="Phone Number"
                />
              </div>
              <div className="field-container">
                <InputField
                  name="school"
                  placeholder="Enter School"
                  fontSize={14}
                  height={40}
                  width="100%"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.school || ''}
                  labelTitle="School"
                />
              </div>
              <div className="field-container">
                <InputField
                  name="dorm"
                  placeholder="Enter Dorm Location"
                  fontSize={14}
                  height={40}
                  width="100%"
                  backgroundColor={colors.ash}
                  paddingLeft={25}
                  paddingRight={25}
                  value={values?.dorm || ''}
                  labelTitle="Dorm Location"
                />
              </div>
              <div className="field-container">
                <SelectField
                  labelTitle="Select Year"
                  required={true}
                  placeholder="Select Year"
                  name="year"
                  options={isArray(schoolYears) ? schoolYears : []}
                  height={40}
                  valueKey="value"
                  display="value"
                  containerWidth="100%"
                  selectedOption={values?.year}
                  handleChangeFunc={handleChange}
                />
              </div>

              <div className="flex flex-end form-button-box w-100pc">
                <ButtonIcon
                  buttonText="Update"
                  backgroundColor={colors.primary}
                  borderColor={colors.primary}
                  color={colors.white}
                  height={51}
                  marginTop={2}
                  borderRadius={0}
                  fontSize={16}
                  className="form-button"
                  onClick={() => updateProfile(values)}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* footer */}
      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="top-right" />
    </section>
  );
}

export default UpdateProfileScreen;
