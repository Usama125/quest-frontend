import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RootContext } from '../contextApi/index';

export default ({ children, ...routeProps }) => {

  const { user } = useContext(RootContext);

  return (
    <Route
      {...routeProps}
      render={() => (Object.keys(user).length > 0 ?
        (
          children
        ) :
        <Redirect to='/login' />)
      }
    />
  );
};