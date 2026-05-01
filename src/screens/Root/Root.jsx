import { Routes, Route } from "react-router-dom";

// screens
import ErrorBoundary from "../../components/error/AppErrorBoundary";
import IndexScreen from "../Index/IndexScreen";
import OnboardingScreen from "../authentication/OnboardingScreen";
import {
  ROUTE_ABOUT_US,
  ROUTE_CONTACT,
  ROUTE_EDIT_PROFILE,
  ROUTE_FORGOT_PASSWORD,
  ROUTE_HOME,
  ROUTE_ITEMS_OF_INTEREST,
  ROUTE_ONBOARDING,
  ROUTE_PERSONAL_INFORMATION,
  ROUTE_PRODUCT_ADD,
  ROUTE_PRODUCT_EDIT,
  ROUTE_PRODUCTS,
  ROUTE_PROFILE,
  ROUTE_REGISTRATION_SUCCESSFUL,
  ROUTE_RESET_PASSWORD,
  ROUTE_SEND_ACCESS_CODE,
  ROUTE_SERVICES,
  ROUTE_SIGN_IN,
  ROUTE_USER_TYPE,
  ROUTE_VERIFY_ACCESS_CODE,
  ROUTE_WELCOME,
} from "../../config/constants";
import VerifyAccessCodeScreen from "../authentication/VerifyAccessCodeScreen";
import PersonalInformationScreen from "../authentication/PersonalInformationScreen";
import UserTypeScreen from "../authentication/UserTypeScreen";
import ItemsOfInterestsScreen from "../authentication/ItemsOfInterestsScreen";
import WelcomeScreen from "../authentication/WelcomeScreen";
import SendAccessCodeScreen from "../authentication/SendAccessCodeScreen";
import SignInScreen from "../authentication/SignInScreen";
import ForgotPasswordScreen from "../authentication/ForgotPasswordScreen";
import ResetPasswordScreen from "../authentication/ResetPasswordScreen";
import NotFound from "../error_pages/NotFound";
import UnauthorizedPage from "../error_pages/UnauthorizedPage";
import ProfileScreen from "../profile/ProfileScreen";
import AboutUsScreen from "../Index/AboutUsScreen";
import ServicesScreen from "../Index/ServicesScreen";
import ContactUsScreen from "../Index/ContactUsScreen";
import AddUpdateProductScreen from "../product/AddUpdateProductScreen";
import ProductsScreen from "../product/ProductsScreen";
import UpdateProfileScreen from "../profile/UpdateProfileScreen";

const Root = () => {
  return (
    <div className="container">
      <Routes>
        {/* authentication. Non protected */}
        <Route element={<OnboardingScreen />} path={ROUTE_ONBOARDING} />
        <Route
          element={<SendAccessCodeScreen />}
          path={ROUTE_SEND_ACCESS_CODE}
        />
        <Route
          element={<VerifyAccessCodeScreen />}
          path={`${ROUTE_VERIFY_ACCESS_CODE}/:email`}
        />
        <Route element={<WelcomeScreen />} path={ROUTE_WELCOME} />
        <Route
          element={<ForgotPasswordScreen />}
          path={ROUTE_FORGOT_PASSWORD}
        />
        <Route element={<ResetPasswordScreen />} path={ROUTE_RESET_PASSWORD} />

        {/* protected route */}
          <Route
            path={ROUTE_HOME}
            element={<IndexScreen />}
            errorElement={<ErrorBoundary />}
          />
          <Route
            element={<PersonalInformationScreen />}
            path={`${ROUTE_PERSONAL_INFORMATION}/:email`}
          />
          <Route element={<UserTypeScreen />} path={`${ROUTE_USER_TYPE}`} />
          <Route
            element={<ItemsOfInterestsScreen />}
            path={ROUTE_ITEMS_OF_INTEREST}
          />
          <Route
            element={<WelcomeScreen />}
            path={ROUTE_REGISTRATION_SUCCESSFUL}
          />
          <Route element={<SignInScreen />} path={ROUTE_SIGN_IN} />
          <Route element={<AboutUsScreen />} path={ROUTE_ABOUT_US} />
          <Route element={<ServicesScreen />} path={ROUTE_SERVICES} />
          <Route element={<ContactUsScreen />} path={ROUTE_CONTACT} />
          
          {/* products */}
            <Route element={<AddUpdateProductScreen />} path={ROUTE_PRODUCT_ADD} />
            <Route element={<AddUpdateProductScreen />} path={ROUTE_PRODUCT_EDIT + '/:product_id'} />
            <Route element={<ProductsScreen />} path={ROUTE_PRODUCTS} />
        
          {/* Profile */}
            <Route element={<ProfileScreen />} path={ROUTE_PROFILE} />  
            <Route element={<UpdateProfileScreen />} path={ROUTE_EDIT_PROFILE + '/:user_id'} />  
          {/* user route */}
        {/* End of protected route */}


        {/* authentication. Non protected */}
        <Route path="*" element={<NotFound />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </div>
  );
};

export default Root;
