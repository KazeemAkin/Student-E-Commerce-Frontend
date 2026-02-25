import { Routes, Route } from "react-router-dom";

// screens
import ErrorBoundary from "../../components/error/AppErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import IndexScreen from "../Index/IndexScreen";
import OnboardingScreen from "../authentication/OnboardingScreen";
import {
  ROUTE_HOME,
  ROUTE_ONBOARDING,
  ROUTE_SIGN_UP,
  ROUTE_VERIFY_ACCESS_CODE,
} from "../../config/constants";
import SignUpScreen from "../authentication/SignUpScreen";
import VerifyAccessCodeScreen from "../authentication/VerifyAccessCodeScreen";

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
        <Route element={<SignUpScreen />} path={ROUTE_SIGN_UP} />
        <Route
          element={<VerifyAccessCodeScreen />}
          path={ROUTE_VERIFY_ACCESS_CODE}
        />

        {/* protected route */}
        <Route
          element={<ProtectedRoute />}
          errorElement={<ErrorBoundary />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Root;
