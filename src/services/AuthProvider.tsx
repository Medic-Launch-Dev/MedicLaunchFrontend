// AuthProvider.tsx

import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  username: string;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkError: () => void;
  checkAuth: () => void;
  checkPermissions: (permissions: string[]) => boolean;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const baseUrl = process.env.REACT_APP_MEDIC_LAUNCH_URL;

  const login = async (email, password): Promise<boolean> => {
    try {
      const response = await axios.post(`${baseUrl}/login`, {
        email,
        password,
      });
      const { accessToken } = response.data;

      // Set the user and token in the state or localStorage, etc.
      // TODO: set user information such as roles, name, profile picture, etc.
      localStorage.setItem("accessToken", accessToken);
      return true;
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const checkError = () => {
    // Check for any error conditions, if needed
  };

  const checkAuth = () => {
    // Check if the user is authenticated based on the presence of the token
    const authToken = localStorage.getItem("accessToken");
    if (authToken) {
      //   setUser({ username: "exampleUser" }); // Set the user in the state
    }
  };

  const checkPermissions = (permissions: string[]) => {
    // Check if the user has the required permissions
    // For simplicity, assume all logged-in users have permission
    return !!user;
  };

  const isLoggedIn = (): boolean => {
    const accessToken = localStorage.getItem("accessToken");
    // TODO: check expired access token
    // const decodedToken = jwt_decode(accessToken);
    // const currentTime = Date.now() / 1000;
    // if (decodedToken.exp < currentTime) {
    //   return false;
    // }

    if (accessToken && accessToken !== "undefined") {
      return true;
    }

    return false;
  };

  useEffect(() => {
    // Check authentication on component mount
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        checkError,
        checkAuth,
        checkPermissions,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
