import { createContext, useEffect, useReducer } from "react";
import { Actions } from "../@type/action";
import { UserState } from "../@type/state";
import AuthReducer from "./authReducer";

const INITIAL_STATE: UserState = {
  currentUser: JSON.parse(localStorage.getItem("user") || "{}"),
  loginSuccess: localStorage.getItem("loginSuccess") === "true",
};

export const AuthContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<Actions>;
}>({
  state: INITIAL_STATE,
  dispatch: () => undefined,
});

export const AuthContextProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
    localStorage.setItem("loginSuccess", JSON.stringify(state.loginSuccess));
  }, [state.currentUser]);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
