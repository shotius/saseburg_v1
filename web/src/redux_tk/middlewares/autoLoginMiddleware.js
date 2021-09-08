import { AUTH_TOKEN } from "src/utils/const/constants";
import { setAuthUser } from "src/redux_tk/";

export const autoLoginMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === "auth/autoLogin") {
        const token = localStorage.getItem(AUTH_TOKEN);
        // TO-DO check user validity by request
        dispatch(setAuthUser(token));
    }
    next(action);
  };
