const initialState = {
  username: "",
  password: "",
  isAuth: false
};

export const UserLogin = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return Object.assign({}, state, {
        username: action.payload.username,
        password: action.payload.password,
        isAuth: true
      });
    default:
      return state;
  }
};
