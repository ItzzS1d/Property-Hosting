import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { getCurrentUser, SignInResponse } from "../lib/api-client";

interface AuthContextType {
  userInfo: SignInResponse | null;
  loading: boolean;
  setUserInfo: React.Dispatch<React.SetStateAction<SignInResponse | null>>;
}

const authContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<SignInResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUser();
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <authContext.Provider value={{ userInfo, loading, setUserInfo }}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }

  return context;
};

export default AuthContextProvider;
