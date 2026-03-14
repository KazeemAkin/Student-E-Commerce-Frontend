import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ROUTE_REGISTRATION_SUCCESSFUL } from "../../config/constants";
import colors from "../../config/colors";

// css
import "./WelcomeScreen.css";

// api
import authApi from "../../api/Authentication";

// components
import { empty, isString, prepareResponseData } from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";

import welcomeImage from "../../assets/elements/welcome.svg";

function WelcomeScreen() {
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
      <section className="welcome-page-wrapper">
        <Navbar active_screen="" include_search={false} />

        <div className="welcome-page-container">
          <div className="welcome-image-container">
            <img src={welcomeImage} alt="welcome" className="welcome-image" />
          </div>
          <div className="page-title-box">
            <div className="page-subtitle">
              Your account has been setup
              <br />
              successfully.
            </div>
          </div>
        </div>

        <div
          className="flex flex-end"
          style={{ width: "85%", paddingTop: 60, paddingBottom: 100 }}
        >
          <ButtonIcon
            buttonText="Continue"
            backgroundColor={colors.primary}
            borderColor={colors.primary}
            color={colors.white}
            width={198}
            height={51}
            marginTop={2}
            fontSize={16}
            borderRadius={0}
            onClick={() => handleSubmit()}
          />
        </div>
      </section>
      {/* footer */}
      <Footer />
      {isLoading && <FullPageLoader visible={isLoading} />}
      <Toast ref={toastTR} position="bottom-left" />
    </>
  );
}

export default WelcomeScreen;
