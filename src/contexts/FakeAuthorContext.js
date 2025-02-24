import { createContext, useContext, useReducer } from "react";

const AuthorContext = createContext();
const initialState = {
  isAuthenticated: false,
  user: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("Unknown Action");
  }
}

const FAKE_USER = {
  name: "Thulhid",
  email: "thulhid@gmail.com",
  password: "12345678",
  avatar: "/user.jpg",
};
function AuthorProvider({ children }) {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthorContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthorContext.Provider>
  );
}
function useAuthor() {
  const context = useContext(AuthorContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}
export { AuthorProvider, useAuthor };
