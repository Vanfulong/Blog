export enum ActionType {
  Login,
  Logout,
}
export interface Login {
  type: ActionType.Login;
  payload: object;
}
export interface Logout {
  type: ActionType.Logout;
}

export type Actions = Login | Logout;
