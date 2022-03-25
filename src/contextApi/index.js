import React, { useEffect, useState } from 'react';

export const RootContext = React.createContext();

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children }) => {

  const prevSelectedNav = window.localStorage.getItem('selectedNav') || "";
  const prevUser = (window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user'))) || "";

  const [selectedNav, setSelectedNav] = useState(prevSelectedNav);
  const [user, setUser] = useState(prevUser);

  useEffect(
    () => {

      if (!selectedNav) console.log("");
      else window.localStorage.setItem('selectedNav', selectedNav);

      if (!user) console.log("");
      else window.localStorage.setItem('user', JSON.stringify(user));

    },
    [selectedNav, user]
  );

  const defaultContext = {
    selectedNav,
    setSelectedNav,
    setUser,
    user
  };
  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};