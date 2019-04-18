import actions from "../actions/constants";

const initialState = {
  username: "",
  password: "",
  isAuth: false
};

export const UserLogin = (state = initialState, action) => {
  switch (action.type) {
    case actions.USER_LOGIN_REQUEST:
      return Object.assign({}, state, {
        username: action.payload.username,
        password: action.payload.password,
        isAuth: false
      });

    case actions.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        username: action.payload.username,
        password: action.payload.password,
        isAuth: true
      });

    default:
      return state;
  }
};
