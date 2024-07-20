import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useServiceProvider } from "./ServiceProvider";

export const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const { accountStore } = useServiceProvider();

  useEffect(() => {
    if (isLoggedIn()) {
      accountStore.getMyProfile();
      accountStore.getSubscriptionStatus();
      accountStore.getRoles();
    }
  }, []);

  if (!isLoggedIn()) {
    return <Navigate to="/login" />;
  }

  return children;
};
