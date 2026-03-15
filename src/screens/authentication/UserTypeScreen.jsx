import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ROUTE_ITEMS_OF_INTEREST } from "../../config/constants";
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
import { AuthContext } from "../Root/ProtectedRoute";

function UserTypeScreen() {
  const navigation = useNavigate();
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeller, setIsSeller] = useState("");
  const [isBuyer, setIsBuyer] = useState("");
  const { user, setUser } = useContext(AuthContext);

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
   * Submit setUserType form
   */
  const handleSubmit = async () => {
    try {
      if (!isLoading) setIsLoading(true);
      if (empty(isSeller) && empty(isBuyer)) {
        return responseDailog(
          "error",
          "User type not selected!",
          "Please select at least one user type to continue with the registration process.",
        );
      }

      let payload = [];
      if (!empty(isSeller)) {
        payload.push("Seller");
      }

      if (!empty(isBuyer)) {
        payload.push("Buyer");
      }

      const response = await authApi.setUserType({ userType: payload });
      const response_data = prepareResponseData(response);
      if (!response_data?.success) {
        return responseDailog(
          "error",
          "Sign up failed!",
          !empty(response_data?.message) && isString(response_data?.message)
            ? response_data.message
            : "Unfortunatly something went wrong and we were unable to sign you up. Refresh the page or try again later!",
        );
      }

      if (response_data?.response) {
        setUser({ ...user, ...response_data.response });
      }
      navigation(`${ROUTE_ITEMS_OF_INTEREST}`);
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
