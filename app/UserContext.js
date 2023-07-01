import React, { createContext, useState, useEffect } from 'react';
import { useSession,getSession } from "next-auth/react"


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { data: session, status } = useSession()
    const [userId, setUserId] = useState('');
    const [loginStatus, setLoginStatus] = useState("loading")
    // console.log("Login status in context: ", loginStatus)
    // console.log("Status: ", status)
  useEffect(() => {
    setLoginStatus(status)
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
    <UserContext.Provider value={{ userId, setUserId, loginStatus }}>
      {children}
    </UserContext.Provider>
  );
};
export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session)
  return {
    props: {
      initialSession: session,
    },
  };
}