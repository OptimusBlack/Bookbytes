const initialState = {
  username: "",
  password: "",
  isAuth: false
};

export const UserLogin = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      state = {
        username: action.payload.username,
        password: action.payload.password,
        isAuth: true
      };
      return state;
    default:
      return state;
  }
};
