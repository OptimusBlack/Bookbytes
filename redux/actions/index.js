import actions from "./constants";

let login = (username, password) => ({
  type: actions.USER_LOGIN_REQUEST,
  payload: { username: username, password: password }
});

export const userActions = {
  login
};
