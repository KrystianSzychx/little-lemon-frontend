import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data) => {
    try {
      const response = await fetch("https://localhost:7051/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.token) { 
        setUser({ username: data.username }); 
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/dashboard");
        return;
      }
      // Możesz dodać dodatkowe logowanie błędów lub obsługę gdy token nie jest zwrócony
      throw new Error("Token not provided in response");
    } catch (err) {
      console.error(err);
      // Tutaj dodaj obsługę błędów, np. wyświetlenie komunikatu użytkownikowi
    }
  };
  

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};