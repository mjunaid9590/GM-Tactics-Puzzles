import React from 'react'
import { SessionProvider } from 'next-auth/react';


const Layout = ({children}) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Layout
