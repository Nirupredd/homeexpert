import Header from './common/Header'
import Footer from './common/Footer'
import React from 'react'
import {Outlet} from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

// Importing my Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
function RootLayout() {
  return (
    <div>
       <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
       <div>
       <Header/>
          <div style={{minHeight:"100vh"}}>
            <Outlet/>
          </div>
      <Footer/>
       </div>
       </ClerkProvider>
    </div>
  )
}

export default RootLayout
