import { Actions, ActionType } from "../@type/action";
import { UserState } from "../@type/state";

const AuthReducer = (state: UserState, action: Actions): UserState => {
  switch (action.type) {
    case ActionType.Login: {
      return {
        currentUser: action.payload,
        loginSuccess: true,
      };
    }
    case ActionType.Logout: {
      return {
        currentUser: {},
        loginSuccess: false,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
