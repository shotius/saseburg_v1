import React from "react";
import { Redirect, Route } from "react-router-dom";
import { PageLoadSpinner } from "src/components/molecules/PageLoadSpinner";
import { useMeQuery } from "src/generated/graphql";

interface PrivateRouteProps {
  component: React.FC;
  [x: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [{data, fetching}] = useMeQuery()
  
  if (fetching) {
    return <PageLoadSpinner />
  } 

  return (
    <Route
      {...rest}
      render={() => {
        return data ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
