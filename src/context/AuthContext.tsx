import { addUser } from "@/store/movieSlice";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";

interface AuthContextType {
  user: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<string | null>(
    localStorage.getItem("user") || null
  );

  const login = (email: string) => {
    localStorage.setItem("user", email);
    dispatch(addUser(email));
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
