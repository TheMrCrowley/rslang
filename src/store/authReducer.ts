import AuthActions from "./enum";

const defaultState = {
  isAuth: false,
  userData: {}
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    switch AuthActions.REGISTRATION:
      return {...state, userData: action.payload}
    default:
      return state;
  }
};

export default authReducer;
