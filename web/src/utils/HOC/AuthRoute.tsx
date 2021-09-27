import React from 'react';
import { Redirect, Route } from 'react-router';
import { PageLoadSpinner } from 'src/components/molecules/PageLoadSpinner';
import { useMeQuery } from 'src/generated/graphql';

interface AuthRouteProps {
  component: React.FC;
  [x: string]: any;
}

export const AuthRoute: React.FC<AuthRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [{ data, fetching }] = useMeQuery();
  if (fetching) {
    return <PageLoadSpinner />;
  }
  return (
    <Route
      {...rest}
      render={() => (!data ? <Component /> : <Redirect to="/home" />)}
    />
  );
};
