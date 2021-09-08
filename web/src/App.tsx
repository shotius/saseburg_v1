import React, { useMemo } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/Home';

import PrivateRoute from './utils/HOC/PrivateRoute';
import { Login, SignUp } from './pages';
import { useAppDispatch, useAppSelector } from 'src/redux_tk';
import { autoLogin } from 'src/redux_tk';
import { useAuth } from 'src/utils/hooks/useAuth';
import { Theme, ThemeProvider } from '@material-ui/core/styles';
// import themeDefault from "./theme";
import { lightTheme, darkTheme } from 'src/theme';
import { THEME_DARK } from 'src/utils/const/constants';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include"
  }
});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.dispay);

  const isAuthenticated = useAuth();

  // if reload happends authenticate user
  if (isAuthenticated) {
    dispatch(autoLogin());
  }

  // when theme value is changing in the redux this function will execute
  // returns lightTheme or darkTheme
  const prefered_theme: Theme = useMemo(() => {
    if (theme === THEME_DARK) {
      return darkTheme;
    } else {
      return lightTheme;
    }
  }, [theme]);

  return (
    <Provider value={client}>
      <ThemeProvider theme={prefered_theme}>
        <Router>
          <CssBaseline />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <PrivateRoute component={Home} path="/home" exact />
            <Route component={Login} path="/login" />
            <Route component={SignUp} path="/signUp" />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
