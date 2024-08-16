import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";
import { api } from "../utils/api";

export const AuthContext = createContext({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: () => {}, // Adicionado para suporte ao signOut
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const userLogged = localStorage.getItem("@rotaverde365:user");
    if (userLogged) {
      return JSON.parse(userLogged);
    }
    return null;
  });

  async function signIn({ email, password }) {
    try {
      const response = await api(`/users?email=${email}`);
      const data = await response.json();

      // Verifica se algum usuário foi retornado e se a senha corresponde
      const user = data.find(user => user.email === email && user.senha === password);

      if (user) {
        setUser(user);
        localStorage.setItem("@rotaverde365:user", JSON.stringify(user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return false;
    }
  }

  async function signUp(userData) {
    try {
      const response = await api("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.success || true; // Corrigido de `data.sucess` para `data.success`
      } else {
        const errorData = await response.json();
        console.error("Erro ao cadastrar:", errorData);
        return false;
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      return false;
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("@rotaverde365:user");
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  return contexto;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
