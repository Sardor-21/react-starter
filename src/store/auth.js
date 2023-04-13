export const authInitialState = {
  isFetched: false,
  isAuthenticated: false,
  data: {},
  token: "",
};

export const authReducer = set => {
  return {
    signIn: () =>
      set(state => {
        return {
          isFetched: true,
          isAuthenticated: true,
          token: state?.token,
          data: state?.token,
        };
      }),
  };
};
