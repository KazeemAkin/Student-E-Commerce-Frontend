import { token } from "./ReturnToken";
import { empty, prepareResponseData } from "../Utilities/utils";

//api
import generalApi from "./General";

export const getUserDetails = async () => {
  try {
    const { decodedToken } = await token();
    if (!empty(decodedToken)) {
      const userId =
        !empty(decodedToken) && !empty(decodedToken.sub)
          ? decodedToken.sub
          : "";
      const response = await generalApi.getUserData(userId);
      const response_data = prepareResponseData(response);
      if (empty(response_data) || empty(response_data.success)) {
        const statusCodeType = !empty(response_data.statusCodeType)
          ? response_data.statusCodeType
          : "";
        const error = { success: false, statusCodeType };
        return error;
      }

      const userDetails = !empty(response_data.response)
        ? response_data.response
        : {};

      return {
        success: true,
        userDetails,
      };
    }

    return { success: false, response: "Something went wrong." };
  } catch (error) {
    console.log(error);
    return { success: false, response: "Something went wrong." };
  }
};
