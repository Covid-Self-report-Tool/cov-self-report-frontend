import React, { useContext, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from 'Auth';

type PrivateRouteType = {
  component: any;
};

export const PrivateRoute: FC<PrivateRouteType> = ({
  component: RouteComponent,
  ...rest
}) => {
  // @ts-ignore
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={routeProps =>
        currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
};
