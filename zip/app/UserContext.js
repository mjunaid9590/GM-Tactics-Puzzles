import React, { createContext, useState, useEffect } from 'react';
import { useSession } from "next-auth/react"


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { data: session, status } = useSession()
    const [userId, setUserId] = useState('');
  useEffect(() => {
    if (status === "authenticated") {
    //   setIsLoggedIn(true);
      setUserId(session.user.id)
    //   setUsername(session.user.username)
    //   setFullName(session.user.fullName)
      // console.log(session.user.id)

      // console.log("Session User: ", session);
    }
    // console.log("Session Status: ", status)
    // console.log(username);


  }, [status]);
  

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
