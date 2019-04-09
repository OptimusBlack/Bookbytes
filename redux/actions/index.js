const USER_LOGIN = "USER_LOGIN";

export const userLogin = (username, password) => ({
  type: USER_LOGIN,
  payload: { username, password }
});
