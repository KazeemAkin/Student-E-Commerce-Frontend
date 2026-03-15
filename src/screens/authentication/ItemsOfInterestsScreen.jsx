import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ROUTE_REGISTRATION_SUCCESSFUL } from "../../config/constants";
import colors from "../../config/colors";

// css
import "./ItemsOfInterestsScreen.css";

// api
import authApi from "../../api/Authentication";

// components
import {
  empty,
  isArray,
  isString,
  prepareResponseData,
} from "../../Utilities/utils";
import FullPageLoader from "../../components/loader/FullPageLoader";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ButtonIcon from "../../components/buttons/buttonIcon/ButtonIcon";
import { ItemsOfInterests } from "../../data/itemsOfInterests";
import { AuthContext } from "../Root/ProtectedRoute";

function ItemsOfInterestsScreen() {
  const navigation = useNavigate();
  const toastTR = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
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
   * Submit signup form
   * @param {*} values
   */
  const handleSubmit = async (values) => {
    try {
      if (!isLoading) setIsLoading(true);
      if (empty(selectedItems)) {
        return responseDailog(
          "error",
          "Sign up failed!",
          "Please select at least one category of interest!",
        );
      }
      const response = await authApi.setItemsOfInterest({ selectedItems });
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

  const toggleSelections = (item_id) => {
    if (!isString(item_id)) {
      return;
    }
    if (selectedItems.includes(item_id)) {
      setSelectedItems((prev) => prev.filter((i) => i !== item_id));
    } else {
      setSelectedItems((prev) => [...prev, item_id]);
    }
  };

  return (
    <>
      <section className="items-of-interest-page-wrapper">
        <Navbar active_screen="" include_search={false} />

        <div className="items-of-interest-container">
          <div className="page-title-box">
            <div className="page-title">Items of Interests</div>
            <div className="page-subtitle">
              Select at least one that applies
            </div>
          </div>

          <div className="items-of-interests">
            {isArray(ItemsOfInterests) &&
              ItemsOfInterests.map((item) => (
                <div
                  className="item-of-interest"
                  onClick={() => toggleSelections(item.id)}
                  style={{
                    backgroundColor: selectedItems.includes(item.id)
                      ? colors.primary
                      : colors.lightAsh,
                    color: selectedItems.includes(item.id)
                      ? colors.white
                      : colors.black,
                  }}
                  key={item.id}
                >
                  {item.title}
                </div>
              ))}
          </div>
        </div>

        <div className="item-of-interest-btn">
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

export default ItemsOfInterestsScreen;
