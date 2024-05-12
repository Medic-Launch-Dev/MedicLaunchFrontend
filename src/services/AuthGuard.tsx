import { useAuth } from "./AuthProvider";

export const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useAuth();

  // if (!isLoggedIn()) {
  //   return <Navigate to="/login" />;
  // }
  return children;
};
