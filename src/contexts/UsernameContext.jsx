import React, { createContext } from "react";
export const UsernameContext = createContext("");
export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = React.useState();
  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameProvider;
