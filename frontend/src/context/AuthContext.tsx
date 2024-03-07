import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signupUser,
} from "../helpers/api-communicator";

type User = {
  username: string;
  name: string;
  email: string;
  position: string;
};
type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    username: string,
    email: string,
    password: string,
    position: string
  ) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // fetch if the user's cookies are valid then skip login
    async function checkStatus() {
      const data = await checkAuthStatus();
      if (data) {
        setUser({
          username: data.username,
          email: data.email,
          name: data.name,
          position: data.position,
        });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);
  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (data) {
      setUser({
        username: data.username,
        email: data.email,
        name: data.name,
        position: data.position,
      });
      setIsLoggedIn(true);
    }
  };
  const signup = async (
    name: string,
    username: string,
    email: string,
    password: string,
    position: string
  ) => {
    const data = await signupUser(name, username, email, password, position);
    if (data) {
      console.log(data);
      setUser({
        username: data.username,
        email: data.email,
        name: data.name,
        position: data.position,
      });
      setIsLoggedIn(true);
    }
  };
  const logout = async () => {
    await logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
  };

  const value = {
    user,
    isLoggedIn,
    login,
    logout,
    signup,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
