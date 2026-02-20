import { Routes, Route } from "react-router-dom";

// screens
import ErrorBoundary from "../../components/error/AppErrorBoundary";
import ProtectedRoute from "./ProtectedRoute";
import IndexScreen from "../Index/IndexScreen";

const Root = () => {
  return (
    <div className="container">
      <Routes>
        {/* authentication. Non protected */}
        <Route
          path="/"
          element={<IndexScreen />}
          errorElement={<ErrorBoundary />}
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
