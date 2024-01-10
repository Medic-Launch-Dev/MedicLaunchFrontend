// ProtectedRoute.tsx

import { useAuth } from "./AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // if (!isLoggedIn()) {
  //   return <Navigate to="/login" />;
  // }
  return children;
};
