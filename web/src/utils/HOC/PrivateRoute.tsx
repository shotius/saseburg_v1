import React from "react";
import { Redirect, Route } from "react-router-dom";
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
    return <div>...loading</div>
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
