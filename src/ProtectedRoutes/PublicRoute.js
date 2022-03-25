import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RootContext } from '../contextApi/index';

export default ({ children, ...routeProps }) => {

  const { user } = useContext(RootContext);

  return (
    <Route
      {...routeProps}
      render={() => (user && Object.values(user).length > 0 ?
            <Redirect to='/' />
        :
            (
                children
            ) 
        )
      }
    />
  );
};