import { useNavigate } from "react-router-dom";
import { useAuth } from "./UseAuth";
import { useEffect } from "react";
import { ROUTE_HOME } from "../config/constants";

export const useUserGuard = (restrict_user = true) => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Still loading → don't do anything yet
    if (isLoggedIn === null) return;

    // If not logged in or user data is invalid
    if (restrict_user && (!isLoggedIn || !user)) {
      console.warn("UserGuard: Invalid user, redirecting to home");
      navigate(ROUTE_HOME, { replace: true });
    }
  }, [user, isLoggedIn, navigate, restrict_user]);
};