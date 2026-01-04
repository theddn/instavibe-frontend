import React from "react"
import { Routes, Route, Navigate } from "react-router"

import { userService } from "./services/user"
import { HomePage } from "./pages/HomePage"

import { AppHeader } from "./cmps/AppHeader"
import { AppFooter } from "./cmps/AppFooter"
import { UserMsg } from "./cmps/UserMsg.jsx"
import { LoginSignup } from "./pages/LoginSignup.jsx"
import { Login } from "./pages/Login.jsx"
import { Signup } from "./pages/Signup.jsx"

export function RootCmp() {
  return (
    <div className='main-container'>
      <AppHeader />
      <UserMsg />

      <main>
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='login' element={<LoginSignup />}>
            <Route index element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
        </Routes>
      </main>
      <AppFooter />
    </div>
  )
}

function AuthGuard({ children, checkAdmin = false }) {
  const user = userService.getLoggedinUser()
  const isNotAllowed = !user || (checkAdmin && !user.isAdmin)
  if (isNotAllowed) {
    console.log("Not Authenticated!")
    return <Navigate to='/' />
  }
  return children
}
