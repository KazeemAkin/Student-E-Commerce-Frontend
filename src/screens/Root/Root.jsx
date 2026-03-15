import { Routes, Route } from "react-router-dom";

// screens
import ErrorBoundary from "../../components/error/AppErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import IndexScreen from "../Index/IndexScreen";
import OnboardingScreen from "../authentication/OnboardingScreen";
import {
  ROUTE_HOME,
  ROUTE_ITEMS_OF_INTEREST,
  ROUTE_ONBOARDING,
  ROUTE_PERSONAL_INFORMATION,
  ROUTE_REGISTRATION_SUCCESSFUL,
  ROUTE_SEND_ACCESS_CODE,
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

const Root = () => {
  return (
    <div className="container">
      <Routes>
        {/* authentication. Non protected */}
        <Route
          path={ROUTE_HOME}
          element={<IndexScreen />}
          errorElement={<ErrorBoundary />}
        />
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
        <Route element={<SignInScreen />} path={ROUTE_SIGN_IN} />

        {/* protected route */}
        <Route element={<ProtectedRoute />} errorElement={<ErrorBoundary />}>
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
        </Route>
      </Routes>
    </div>
  );
};

export default Root;
