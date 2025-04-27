import Header from './common/Header'
import Footer from './common/Footer'
import React from 'react'
import {Outlet} from 'react-router-dom'

function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
