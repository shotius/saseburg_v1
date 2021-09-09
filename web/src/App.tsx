import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme, ThemeProvider } from '@material-ui/core/styles';
import React, { useMemo } from 'react';
import {
  BrowserRouter as Router, Redirect,
  Route, Switch
} from 'react-router-dom';
import { autoLogin, useAppDispatch, useAppSelector } from 'src/redux_tk';
import { darkTheme, lightTheme } from 'src/theme';
import { THEME_DARK } from 'src/utils/const/constants';
import { createClient, Provider } from 'urql';
import { Login, SignUp } from './pages';
import Home from './pages/Home';
import { AuthRoute } from './utils/HOC/AuthRoute';
import PrivateRoute from './utils/HOC/PrivateRoute';


const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: "include"
  }
});

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.dispay);



  // if reload happends authenticate user
  if (true) {
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
            <AuthRoute component={Login} path="/login" exact/>
            <AuthRoute component={SignUp} path="/signUp" exact/>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};
export default App;
