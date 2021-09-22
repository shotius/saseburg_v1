import React from 'react';
import {
  BrowserRouter as Router, Redirect,
  Route, Switch
} from 'react-router-dom';
import { autoLogin, useAppDispatch } from 'src/redux_tk';
import { createClient, Provider as UrqlProvider } from 'urql';
import { Login } from './pages';
import { Home } from './pages/Home';
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



  // if reload happends authenticate user
  if (true) {
    dispatch(autoLogin());
  }

  return (
    <UrqlProvider value={client}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <PrivateRoute component={Home} path="/home" exact />
            <AuthRoute component={Login} path="/login" exact/>
            {/* <AuthRoute component={SignUp} path="/signUp" exact/> */}
          </Switch>
        </Router>
    </UrqlProvider>
  );
};
export default App;
