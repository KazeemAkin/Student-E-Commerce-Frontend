import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ROUTE_REGISTRATION_SUCCESSFUL } from "../../config/constants";
import colors from "../../config/colors";

// css
import "./UserTypeScreen.css";

// api
import authApi from "../../api/Authentication";

// image
import emptyCartImage from "../../assets/elements/empty_cart.svg";
import informationTabImage from "../../assets/elements/information_tab.svg";

// components
import { empty, isString, prepareResponseData } from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { FaCheck } from "react-icons/fa";
import CustomCheckbox from "../../components/form/CustomCheckbox";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";

function UserTypeScreen() {
  const navigation = useNavigate();
  const toastTR = useRef(null);
  const location = useLocation();
  const params = location.state || {};
  const email = params.email || "";
  const [isLoading, setIsLoading] = useState(false);
  const [isSeller, setIsSeller] = useState("");
  const [isBuyer, setIsBuyer] = useState("");

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
      <section className="user-type-page-wrapper">
        <Navbar active_screen="" include_search={false} />
        <div className="page-title">User Type</div>

        <div className="user-type-container">
          <div className="buyer-box">
            <CustomCheckbox
              onClick={() => setIsBuyer(isBuyer ? "" : "buyer")}
              children={
                isBuyer === "buyer" ? (
                  <FaCheck size={20} color={colors.primary} />
                ) : (
                  <span></span>
                )
              }
            />
            <div className="image-box">
              <img src={emptyCartImage} alt="buyer" />
              <div className="title">Buyer</div>
            </div>
          </div>
          <div className="seller-box">
            <CustomCheckbox
              onClick={() => setIsSeller(isSeller ? "" : "seller")}
              children={
                isSeller === "seller" ? (
                  <FaCheck size={20} color={colors.primary} />
                ) : (
                  <span></span>
                )
              }
            />
            <div className="image-box">
              <img src={informationTabImage} alt="seller" />
              <div className="title">Seller</div>
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

export default UserTypeScreen;
