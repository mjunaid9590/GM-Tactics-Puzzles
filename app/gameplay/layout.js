"use client"
import React from 'react'
// import { useState } from 'react'

const Layout = ({userId, children}) => {
  // console.log("userId: ", userId)
  return (
    <div className='gameplayLayout'>
      {/* {userId} */}
        {/* {React.cloneElement(children, {userId: userId})} */}
        {children}
    </div>
  )
}

export default Layout
